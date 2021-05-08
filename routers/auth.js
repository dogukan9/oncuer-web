const express = require('express');
const router = express.Router();
const middleware = require('../middleware/checkLogin');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Movie = require('../models/Movie');
const Story = require('../models/Story');

const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Get all users
router.get('/all', async (req, res) => {
  try {
    const user = await User.find();
    return res.json(user);
  } catch (err) {
    console.log(err.message);

    res.status(404).json({ msg: 'something is wrong' });
    1;
  }
});

//get user by id
router.get('/:id', middleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    console.log(user);
    return res.json(user);
  } catch (err) {
    console.log(err.message);

    res.status(404).json({ msg: 'something is wrong' });
  }
});

//get user
router.get('/', middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    console.log(err.message);

    res.status(404).json({ msg: 'something is wrong' });
  }
});

//login
router.post(
  '/',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      /*   if (password === '') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Password is required' }] });
      } else if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Wrong Password' }] });
      }
*/
      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
);

//delete user
router.delete('/deleteUser', [middleware], async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.user.id });
    //  await Profile.findOneAndRemove({ user: req.user.id });
    await Movie.deleteMany({ user: req.user.id });
    // await Story.deleteMany({user:req.user.id});
    res.json({ msg: 'user deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//create a profile

router.post('/edit', [middleware], async (req, res) => {
  const { age, bio } = req.body;
  const user = await User.findById(req.user.id);
  try {
    user.age = age;
    user.bio = bio;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//remove Favorite Movie

router.delete('/removeFavoriteMovie/:id', [middleware], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const removeIndex = user.favoriteMovies
      .map((item) => item.id)
      .indexOf(req.params.id);
    user.favoriteMovies.splice(removeIndex, 1);

    await user.save();
    res.json(user.favoriteMovies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Add favorite movies
router.put('/addFavoriteMovie/:id', [middleware], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(500).json({ msg: 'there is no movie with that id' });
    }
    //  console.log(profile.favoriteMovies);
    if (
      user.favoriteMovies.filter((favorite) => favorite.id === req.params.id)
        .length > 0
    ) {
      return res
        .status(404)
        .json({ msg: 'Movie already added to favorite movie' });
    }
    const fav = {
      _id: movie.id,
      name: movie.name,
      category: movie.category,
      director: movie.director,
      imageUrl: movie.imageUrl,
    };

    user.favoriteMovies.push(fav);
    await user.save();
    return res.json(user.favoriteMovies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Like favorite movies

router.put(
  '/likeFavoriteMovie/:movieId/:ownId',
  [middleware],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.ownId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      let array = user.favoriteMovies.find(
        (item) => item.id === req.params.movieId
      );

      if (array.likes.filter((it) => it.id === req.user.id).length > 0) {
        return res.status(404).json({ msg: 'Movie is already liked' });
      }

      const addIndex = user.favoriteMovies
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      user.favoriteMovies[addIndex].likes.push(req.user.id);
      await user.save();
      console.log(user);
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//unLike favorite movies

router.put(
  '/unlikeFavoriteMovie/:movieId/:ownId',
  [middleware],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.ownId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }
      let array = user.favoriteMovies.find(
        (item) => item.id === req.params.movieId
      );
      if (array.likes.filter((it) => it.id === req.user.id).length === 0) {
        return res.status(404).json({ msg: 'Movie is already unliked' });
      }
      let likeArray = user.favoriteMovies.find(
        (item) => item.id === req.params.movieId
      );

      likeArray = likeArray.likes.filter((item) => item.id !== req.user.id);
      const removeIndex = user.favoriteMovies
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      user.favoriteMovies[removeIndex].likes = likeArray;

      await user.save();
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//add favori story

router.put('/addFavoriStory/:id', [middleware], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const story = await Story.findById(req.params.id);
    //console.log(story);
    if (!story) {
      res.status(500).json({ msg: 'there is no story with that id' });
    }

    if (
      user.favoriteStories.filter((favorite) => favorite.id === req.params.id)
        .length > 0
    ) {
      return res
        .status(404)
        .json({ msg: 'Story already added to favorite movie' });
    }
    const fav = {
      _id: story.id,
      name: story.name,
      story: story.story,
      writer: story.writer,
      imageUrl: story.imageUrl,
    };

    user.favoriteStories.push(fav);
    await user.save();
    return res.json(user.favoriteStories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
module.exports = router;

//remove Favorite Story

router.delete('/removeFavoriteStory/:id', [middleware], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (!user) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const removeIndex = user.favoriteStories
      .map((item) => item.id)
      .indexOf(req.params.id);
    user.favoriteStories.splice(removeIndex, 1);

    await user.save();
    res.json(user.favoriteStories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Like favorite stories

router.put(
  '/likeFavoriteStory/:storyId/:ownId',
  [middleware],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.ownId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }
      /*   console.log(
        profile.favoriteMovies.map((item) =>
          item.likes.filter((it) => it.id.toString() === req.user.id)
        )
      );*/
      let array = user.favoriteStories.find(
        (item) => item.id === req.params.storyId
      );
      console.log(array);
      /*   if (
        profile.favoriteMovies.map((item) =>
          item.likes.filter((it) => it.id.toString() === req.user.id)
        )[0].length > 0
      )*/ if (
        array.likes.filter((it) => it.id === req.user.id).length > 0
      ) {
        return res.status(404).json({ msg: 'Movie is already liked' });
      }
      //array.likes.push(req.user);
      const addIndex = user.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.storyId);

      user.favoriteStories[addIndex].likes.push(req.user.id);
      await user.save();
      console.log(user);
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//unLike favorite stories

router.put(
  '/unlikeFavoriteStory/:storyId/:ownId',
  [middleware],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.ownId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }
      let array = user.favoriteStories.find(
        (item) => item.id === req.params.storyId
      );
      if (array.likes.filter((it) => it.id === req.user.id).length === 0) {
        return res.status(404).json({ msg: 'Story is already unliked' });
      }
      let likeArray = user.favoriteStories.find(
        (item) => item.id === req.params.storyId
      );

      likeArray = likeArray.likes.filter((item) => item.id !== req.user.id);
      const removeIndex = user.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.storyId);

      user.favoriteStories[removeIndex].likes = likeArray;

      await user.save();
      console.log(user);
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//comment favorite movies

router.put(
  '/commentFavoriteMovie/:movieId/:ownerId',
  [middleware],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.ownerId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const { comment } = req.body;

      const addIndex = user.favoriteMovies
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      user.favoriteMovies[addIndex].comments.push({
        user: req.user.id,

        text: comment,
        username: req.user.username,
      });
      await user.save();
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//comment favorite storie

router.put(
  '/commentFavoriteStory/:storyId/:ownerId',
  [middleware],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.ownerId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const { comment } = req.body;
      const addIndex = user.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.storyId);

      user.favoriteStories[addIndex].comments.push({
        user: req.user.id,
        text: comment,
        username: req.user.username,
      });
      await user.save();
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

////remove comment favorite movies

router.delete(
  '/deleteCommentFavoriteMovie/:movieId/:commentId/:ownerId',
  [middleware],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.ownerId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const removeIndex = user.favoriteMovies
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      const comment = user.favoriteMovies[removeIndex].comments.filter(
        (comment) => comment.id !== req.params.commentId
      );

      /* const removeComment = profile.favoriteMovies[removeIndex].comments
        .map((fav) => fav.id.toString())
        .indexOf(req.params.commentId);*/

      // profile.favoriteMovies[removeIndex].comments.slice(removeComment, 1);
      user.favoriteMovies[removeIndex].comments = comment;
      await user.save();
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

///remove comment favorite story

router.delete(
  '/deleteCommentFavoriteStory/:storyId/:commentId/:ownerId',
  [middleware],
  async (req, res) => {
    try {
      /* const profile = await Profile.findById(req.params.ownerId);
      if (!profile) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const removeIndex = profile.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      const comment = profile.favoriteStories[removeIndex].findAll(
        (comment) => comment.user === req.user.id
      );
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      const removeComment = profile.favoriteStories[removeIndex].comments
        .map((fav) => fav.id.toString())
        .indexOf(req.params.commentId);

      profile.favoriteStroies[removeIndex].comments.slice(removeComment, 1);
      await profile.save();
      return res.json(profile);*/
      const user = await User.findById(req.params.ownerId);
      if (!user) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const removeIndex = user.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.storyId);

      const comment = user.favoriteStories[removeIndex].comments.filter(
        (comment) => comment.id !== req.params.commentId
      );
      console.log(comment);

      user.favoriteStories[removeIndex].comments = comment;
      await user.save();
      return res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

module.exports = router;
