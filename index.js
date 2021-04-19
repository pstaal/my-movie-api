const express = require('express');
const app = express();

let topMovies = [
  {
    title: 'Midsommar'
  },
  {
    title: 'Lord of the Rings'
  },
  {
    title: 'The Joker'
  },
  {
    title: 'Star Wars'
  },
  {
    title: 'Casino'
  },
  {
    title: 'The Wolf of Wallstreet'
  },
  {
    title: 'Scarface'
  },
  {
    title: 'Her'
  },
  {
    title: 'Wallstreet'
  },
  {
    title: 'Forest Gump'
  }
];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('This is Peter\'s movie database');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});