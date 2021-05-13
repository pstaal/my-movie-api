const express = require('express'),
morgan = require('morgan'),
uuid = require('uuid'),
bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


app.get('/', (req, res) => {
  res.send('This is Peter\'s movie database');
});

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:name', (req, res) => {
  res.json(topMovies.find((movie) =>
    { return movie.director === req.params.name}));
});

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.post('user/:name/favorites', (req, res) => {
  let newMovie = req.body;
  if(!newMovie.favorite) {
    const message = 'Missing "favorite" in request body';
    res.status(400).send(message);
  } else {
    res.status(201).send(newMovie);
  }
});

// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
app.delete('user/:name/favorites', (req, res) => {
  res.send(`movie ${name} was removed to favorites`);
});

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/:genre', (req, res) => {
  res.send('Successful GET request!');
});

//Return data about a director (bio, birth year, death year) by name
app.get('/movies/:director', (req, res) => {
  res.send('Successful GET request!');
});

// Allow users to update their user info (username)
app.put('/user/:name', (req, res) => {
  res.send('Successful PUT request!');
});

// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)
app.delete('/user/:name', (req, res) => {
  res.send('Successful DELETE request!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});