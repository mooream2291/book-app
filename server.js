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

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log('request body:', req.body);
  console.log('form data:', req.body.search);
  if (req.body.search[1] === 'title') url += `intitle:req.body.search[0]`;
  if (req.body.search[1] === 'author') url += `intitle:req.body.search[0]`;

  superagent.get(url)
    .then(data => res.json(data));
}
app.listen(PORT, ()=> {
  console.log(`listening on ${PORT}`);
});

app.get('/hello', (request, response) => {
  response.render('pages/index.ejs');
}
);

app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new.ejs');
});

