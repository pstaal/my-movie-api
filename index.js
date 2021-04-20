const express = require('express'),
morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'Midsommar',
    description: 'A couple travels to Scandinavia to visit a rural hometown\'s fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.',
    genre: 'horror',
    director: 'Ari Aster',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg'
  },
  {
    title: 'Lord of the Rings, Fellowship of the ring',
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    genre: 'fantasy',
    director: 'Peter Jackson',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'
  },
  {
    title: 'Joker',
    description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
    genre: 'thriller',
    director: 'Todd Philips',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg'
  },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    genre: 'science fiction',
    director: 'George Lucas',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
  },
  {
    title: 'Casino',
    description: 'A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.',
    genre: 'thriller',
    director: 'Martin Scorsese',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'
  },
  {
    title: 'The Wolf of Wallstreet',
    description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    genre: 'biography',
    director: 'Martin Scorsese',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg'
  },
  {
    title: 'Scarface',
    description: 'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
    genre: 'crime',
    director: 'Brian De Palma',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BNjdjNGQ4NDEtNTEwYS00MTgxLTliYzQtYzE2ZDRiZjFhZmNlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg'
  },
  {
    title: 'Her',
    description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
    genre: 'romance',
    director: 'Spike Jonze',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_.jpg'
  },
  {
    title: 'Wall Street',
    description: 'A young and impatient stockbroker is willing to do anything to get to the top, including trading on illegal inside information taken through a ruthless and greedy corporate raider who takes the youth under his wing.',
    genre: 'drama',
    director: 'Oliver Stone',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BNmEyZGQ4NDQtNTEzZC00MDczLWE4ZTEtYTg0ODg2NTkyMWM3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg'
  },
  {
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    genre: 'drama',
    director: 'Robert Zemeckis',
    image_URL: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
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