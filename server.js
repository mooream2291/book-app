'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.static('./public'));
//loading css after page load//
app.set('view engine', 'ejs');
//queries the API
app.post('/searches', createSearch);
//represents URL that the user is going to//
app.get('/index', (req, res) => {
  const sql = 'SELECT * FROM book_table';
  client.query(sql)
    .then(results => {
      res.render('pages/index', {'book_table': results.rows});
    });
});
//pulls everything in from API into database when user puts in search info//
app.get('/books: id', {})
app.post('/getNewBook');
  const sql = 'SELECT * FROM '
//app.post to add to database from select this book button on wireframe//
//do a client.query call the res.render will display on page.//

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log('request body:', req.body);
  console.log('form data:', req.body.search);
  if (req.body.search[1] === 'title') url += `intitle:${req.body.search[0]}`;
  if (req.body.search[1] === 'author') url += `inauthor:${req.body.search[0]}`;

  console.log(url);
//superagent is just a tool to hit APIs//
  superagent.get(url)
    .then(data => {
      console.log('google books data:', data.body.items);
      const newBookArr = data.body.items.map(book => {
        return new Book(book);
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
  this.author = data.volumeInfo.authors ? data.volumeInfo.authors: 'Unavailable';
  this.title = data.volumeInfo.title ? data.volumeInfo.title: 'Unavailable';
  this.description = data.volumeInfo.description ? data.volumeInfo.description: 'Unavailable';
  this.isbn = data.volumeInfo.GETFROMAPI ? data.volumeInfo.GETINFOFROMAPI: 'Unavailable';
  this.bookShelf = data.volumeInfo.GETFROMAPI ? data.volumeInfo.GETINFOFROMAPI: 'Unavailable';
  let coverArt = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail: 'https://i.imgur.com/J5LVHEL.jpg';

  if (coverArt.slice(0, 5) !== 'https') {
    coverArt = 'https' + coverArt.slice(4,coverArt.length);
  }
  this.coverArt = coverArt;
}
app.get('/searches/new', (req, res) => {
  res.render('pages/searches/new.ejs');
//.get, or .post, that string is the URL, it goes into the URL bar to determine what to do, only use specific file when using render method
});
app.listen(PORT, ()=> {
  console.log(`listening on ${PORT}`);
});
