const express = require('express');
const router = express.Router();
const middleware = require('../middleware/checkLogin');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Profile = require('../models/Profile');
const { check, validationResult } = require('express-validator/check');

//get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(404).json({ msg: 'there is an error' });
  }
});

//get a movie by id
router.get('/:id', [middleware], async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id);
    res.json(movies);
  } catch (error) {
    res.status(404).json({ msg: 'there is an error' });
  }
});

//add a movie
router.post(
  '/',
  [
    middleware,
    [
      check('name', 'Enter the name movie').notEmpty(),
      check('category', 'Enter the category of movie').notEmpty(),
      check('director', 'Enter the director name').notEmpty(),
      check('imageUrl', 'Enter the director name').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, category, director, imageUrl } = req.body;
    try {
      // const user = await User.findById(req.user.id).select('-password');
      const newMovies = new Movie({
        name: name,
        category: category,
        director: director,
        imageUrl: imageUrl,
        user: req.user.id,
      });

      const movie = await newMovies.save();
      res.json(movie);
    } catch (error) {
      res.status(404).json({ msg: 'there is an error' });
    }
  }
);

//Like Movie
router.put('/likeMovie/:movieId', [middleware], async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    if (movie.likes.filter((it) => it.id === req.user.id).length > 0) {
      return res.status(404).json({ msg: 'Movie is already liked' });
    }

    movie.likes.push({
      _id: req.user.id,
      username: req.user.username,
    });

    await movie.save();
    const movies = await Movie.find();

    return res.json(movies);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//DisLike Movie
router.put('/DislikeMovie/:movieId', [middleware], async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    if (movie.likes.filter((it) => it.id === req.user.id).length === 0) {
      return res.status(404).json({ msg: 'Movie is already unliked' });
    }

    const removeIndex = movie.likes
      .map((fav) => fav.id.toString())
      .indexOf(req.user.id);

    movie.likes.splice(removeIndex, 1);

    await movie.save();
    const movies = await Movie.find();

    return res.json(movies);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Add comment
router.put('/commentMovie/:movieId', [middleware], async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    const { text } = req.body;

    movie.comments.push({
      user: req.user.id,
      username: req.user.username,
      text: text,
    });

    await movie.save();
    const movies = await Movie.find();

    return res.json(movies);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Delete Comment  movie
router.delete(
  '/DeleteCommentMovie/:movieId/:commentId',
  [middleware],
  async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.movieId);

      /* if (movie.comments.filter((it) => it.id === req.user.id).length === 0) {
        return res.status(404).json({ msg: 'Movie is already deleted' });
      }*/

      const removeIndex = movie.comments
        .map((fav) => fav.id.toString())
        .indexOf(req.params.commentId);

      movie.comments.splice(removeIndex, 1);

      await movie.save();
      const movies = await Movie.find();

      return res.json(movies);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//Like Movie
router.put('/likeMoviee/:movieId', [middleware], async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    if (movie.likes.filter((it) => it.id === req.user.id).length > 0) {
      return res.status(404).json({ msg: 'Movie is already liked' });
    }

    movie.likes.push({
      _id: req.user.id,
      username: req.user.username,
    });

    await movie.save();

    return res.json(movie);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//DisLike Movie
router.put('/DislikeMoviee/:movieId', [middleware], async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    if (movie.likes.filter((it) => it.id === req.user.id).length === 0) {
      return res.status(404).json({ msg: 'Movie is already unliked' });
    }

    const removeIndex = movie.likes
      .map((fav) => fav.id.toString())
      .indexOf(req.user.id);

    movie.likes.splice(removeIndex, 1);

    await movie.save();

    return res.json(movie);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
module.exports = router;
