'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.static('./public'));
//loading css after page load//
app.set('view engine', 'ejs');
app.post('/searches/new.ejs', createSearch);

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log('request body:', req.body);
  console.log('form data:', req.body.search);
  if (req.body.search[1] === 'title') url += `intitle:req.body.search[0]`;
  if (req.body.search[1] === 'author') url += `intitle:req.body.search[0]`;


  superagent.get(url)
    .then(data => {
      console.log('google books data:', data);
      res.json(data.text);

      app.get('/hello', (req, res) => {
        res.render('pages/index.ejs');
      });

      function Book(data){
        this.author = data.title ? data.title: 'Unavailable';
        this.title = data.authors ? data.authors: 'Unavailable';
        this.description = data.description ? data.description: 'Unavailable';
        let coverArt = data.imageLinks.thumbnail ? data.imageLinks.thumbnail: 'https://i.imgur.com/J5LVHEL.jpg';

        if (coverArt.slice(0, 5) !== 'https') {
          coverArt = 'https' + coverArt.slice(4,coverArt.length);
        }
        this.coverArt = coverArt;

        app.get('/searches/new', (request, response) => {
          response.render('pages/searches/new.ejs');
        });
      }
      app.listen(PORT, ()=> {
        console.log(`listening on ${PORT}`);
      });
    });
}
