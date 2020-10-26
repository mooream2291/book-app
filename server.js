'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);
//this line gives an error from pg//
client.on('error', err => {
  return console.error(err);
});
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.static('./public'));
//loading css after page load//
app.set('view engine', 'ejs');
//queries the API
app.post('/searches', createSearch);
//represents URL that the user is going to//
app.get('/index');

//pulls everything in from API into database when user puts in search info//
//when there is a piece of data after books (denoted by colon) save this piece of information using request.params//
app.get('/books/:id', getOneBook);

app.post('/addnewbook', saveBook);

app.get('/searches/new', getUrl);//homepage

app.put('update/books/:id', updateBook);

//TODO: ADD PUT route
//TODO: ADD DELETE route

function getOneBook (req, res) { //for ticket 4 change arrow functions to a function expression (46 is an example)//
  console.log('trying to get single book');
//request.params.id (id comes from key in books.sql (which is our database) id is a unique value given to each object by postgres node)
  const id = req.params.id;
  const sql = `SELECT * FROM book_table WHERE id=${id};`;
  console.log(sql);
  client.query(sql)
    .then(results => {
      //.rows is an array of the rwos that are a result of my sql statement postgres puts objects intoa  table and this is asking for the rows the table//
      res.render('pages/books/detail', {book: results.rows[0]});
    })
    .catch(error => console.log(error));
};
// eslint-disable-next-line no-redeclare
function saveBook(req, res) {
//INSERT SQL statement//
//anything posting to form data needs to be req.body
  console.log(req.body);
  let sql = 'INSERT INTO  book_table (image_url, title, author, description, isbn, bookshelf) VALUES ($1, $2, $3, $4, $5, $6);';
  let storageVal = [req.body.imageLinks, req.body.title, req.body.authors, req.body.description, req.body.industryIdentifiers, req.body.categories];
  client.query(sql, storageVal)
  //query: making a request to our database to get a result from the sql request//
    .then(()=> {
      res.render('pages/books/detail', {book: new Book(req.body)});
      //response: response from either database or API is sent to the user//
    });
//render to detail//
}
function updateBook(req, res) {
  let { image_url, title, author, description, isbn, bookshelf } = req.body;
  let SQL = `UPDATE book_table SET image_url=$1, title=$2, author=$3, description=$4, isbn=$5, bookshelf=$6 WHERE id=$7`;//the id does not live on the request body, it lives int he request.params (so the url)
  let values = [image_url, title, author, description, isbn, bookshelf, req.params.id];

  client.query(SQL, values)
    .then(res.redirect(`/books/${req.params.books_id}`))
    .catch(err => console.error(err));
}
//app.post to add to database from select this book button on wireframe//
//do a client.query call the res.render will display on page.//

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  // console.log('request body:', req.body);
  // console.log('form data:', req.body.search);
  if (req.body.search[1] === 'title') url += `intitle:${req.body.search[0]}`;
  if (req.body.search[1] === 'author') url += `inauthor:${req.body.search[0]}`;

  console.log(url);
  //superagent is just a tool to hit APIs//
  superagent.get(url)
    .then(data => {
      console.log('google books data:', data.body.items);
      const newBookArr = data.body.items.map(book => {
        return new Book(book.volumeInfo);
      });
      //whatever I for each through is what i want to render in my route//
      res.render('pages/searches/show', {results: newBookArr});
    })
    .catch((error) => {
      console.log('ERROR', error);
      res.status(500).render('pages/searches/error');
    });
}

function Book(data){
  this.author = data.authors ? data.authors: 'Unavailable';
  this.title = data.title ? data.title: 'Unavailable';
  this.description = data.description ? data.description: 'Unavailable';
  this.isbn = data.industryIdentifiers ? (data.industryIdentifiers[0].identifier ? data.industryIdentifiers[0].identifier: data.industryIdentifiers): 'Unavailable';
  this.bookShelf = data.categories ? data.categories: 'Unavailable';
  let coverArt = data.imageLinks ? (data.imageLinks.thumbnail ? data.imageLinks.thumbnail: data.imageLinks): 'https://i.imgur.com/J5LVHEL.jpg';

  if (coverArt.slice(0, 5) !== 'https') {
    coverArt = 'https' + coverArt.slice(4,coverArt.length);
  }
  this.coverArt = coverArt;
}

function getUrl (req, res) {
  res.render('pages/searches/new.ejs');
//.get, or .post, that string is the URL, it goes into the URL bar to determine what to do, only use specific file when using render method
}
//connects database before express takes API requests//
client.connect()
  .then(() => {
    app.listen(PORT, ()=> {
      console.log(`listening on ${PORT}`);
    });
  });

