const express = require('express'),
morgan = require('morgan');

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
app.use(morgan('common'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.get('/', (req, res) => {
  res.send('This is Peter\'s movie database');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});