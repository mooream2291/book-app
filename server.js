'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.static('./public'));
//loading css after page load//
app.set('view engine', 'ejs');
app.post('/searches', createSearch);
//represents URL that the user is going to//

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log('request body:', req.body);
  console.log('form data:', req.body.search);
  if (req.body.search[1] === 'title') url += `intitle:${req.body.search[0]}`;
  if (req.body.search[1] === 'author') url += `inauthor:${req.body.search[0]}`;

  console.log(url);

  superagent.get(url)
    .then(data => {
      console.log('google books data:', data.body.items);
      const newBookArr = data.body.items.map(book => {
        return new Book(book);
      });
      res.render('pages/searches/show.ejs', {results: newBookArr});
    });
}
app.get('/hello', (req, res) => {
  res.render('pages/index.ejs');
});

function Book(data){
  this.author = data.volumeInfo.authors ? data.volumeInfo.authors: 'Unavailable';
  this.title = data.volumeInfo.title ? data.volumeInfo.title: 'Unavailable';
  this.description = data.volumeInfo.description ? data.volumeInfo.description: 'Unavailable';
  let coverArt = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail: 'https://i.imgur.com/J5LVHEL.jpg';

  if (coverArt.slice(0, 5) !== 'https') {
    coverArt = 'https' + coverArt.slice(4,coverArt.length);
  }
  this.coverArt = coverArt;
}
app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new.ejs');
//.get, or .post, that string is the URL, it goes into the URL bar to determine what to do, only use specific file when using render method
});
app.listen(PORT, ()=> {
  console.log(`listening on ${PORT}`);
});
