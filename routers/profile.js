const express = require('express');
const router = express.Router();
const middleware = require('../middleware/checkLogin');
const Profile = require('../models/Profile');
const { check, validationResult } = require('express-validator/check');
const Movie = require('../models/Movie');
const Story = require('../models/Story');
//get all Profiles
router.get('/all', [middleware], async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (!profiles.length > 0) {
      res.status(500).json({ msg: 'There is no any profile' });
    }
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ msg: 'Service error' });
  }
});

//get a profile by id
router.get('/:id', [middleware], async (req, res) => {
  try {
    const profiles = await Profile.findById(req.params.id);
    if (!profiles) {
      res.status(500).json({ msg: 'There is no  profile' });
    }
    res.json(profiles);
  } catch (error) {}
});

//create a profile

router.post('/', [middleware], async (req, res) => {
  const { age, bio } = req.body;
  try {
    const profile = new Profile({
      _id: req.user.id,
      username: req.user.username,
      age: age,
      bio: bio,
    });
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//remove Favorite Movie

router.delete('/removeFavoriteMovie/:id', [middleware], async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    console.log(profile);
    if (!profile) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const removeIndex = profile.favoriteMovies
      .map((item) => item.id)
      .indexOf(req.params.id);
    profile.favoriteMovies.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Add favorite movies
router.put('/addFavoriteMovie/:id', [middleware], async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);

    if (!profile) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const movie = await Movie.findById(req.params.id);
    console.log(movie);
    if (!movie) {
      res.status(500).json({ msg: 'there is no movie with that id' });
    }
    //  console.log(profile.favoriteMovies);
    if (
      profile.favoriteMovies.filter((favorite) => favorite.id === req.params.id)
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

    profile.favoriteMovies.push(fav);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Like favorite movies

router.put('/likeFavoriteMovie/:movieId', [middleware], async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    if (!profile) {
      res.status(500).json({ msg: 'There is no profile with that id' });
    }
    /*   console.log(
        profile.favoriteMovies.map((item) =>
          item.likes.filter((it) => it.id.toString() === req.user.id)
        )
      );*/
    let array = profile.favoriteMovies.find(
      (item) => item.id === req.params.movieId
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
    const addIndex = profile.favoriteMovies
      .map((fav) => fav.id.toString())
      .indexOf(req.params.movieId);

    profile.favoriteMovies[addIndex].likes.push(req.user.id);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//unLike favorite movies

router.put(
  '/:id/unlikeFavoriteMovie/:movieId',
  [middleware],
  async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }
      let array = profile.favoriteMovies.find(
        (item) => item.id === req.params.movieId
      );
      if (array.likes.filter((it) => it.id === req.user.id).length === 0) {
        return res.status(404).json({ msg: 'Movie is already unliked' });
      }
      let likeArray = profile.favoriteMovies.find(
        (item) => item.id === req.params.movieId
      );

      likeArray = likeArray.likes.filter((item) => item.id !== req.user.id);
      const removeIndex = profile.favoriteMovies
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      profile.favoriteMovies[removeIndex].likes = likeArray;

      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//add favori story

router.put('/addFavoriStory/:id', [middleware], async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);

    if (!profile) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const story = await Story.findById(req.params.id);
    //console.log(story);
    if (!story) {
      res.status(500).json({ msg: 'there is no story with that id' });
    }

    if (
      profile.favoriteStories.filter(
        (favorite) => favorite.id === req.params.id
      ).length > 0
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

    profile.favoriteStories.push(fav);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
module.exports = router;

//remove Favorite Story

router.delete('/removeFavoriteStory/:id', [middleware], async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    console.log(profile);
    if (!profile) {
      res.status(500).json({ msg: 'there is no profile with that id' });
    }
    const removeIndex = profile.favoriteStories
      .map((item) => item.id)
      .indexOf(req.params.id);
    profile.favoriteStories.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Like favorite stories

router.put('/likeFavoriteStory/:storyId', [middleware], async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.id);
    if (!profile) {
      res.status(500).json({ msg: 'There is no profile with that id' });
    }
    /*   console.log(
        profile.favoriteMovies.map((item) =>
          item.likes.filter((it) => it.id.toString() === req.user.id)
        )
      );*/
    let array = profile.favoriteStories.find(
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
    const addIndex = profile.favoriteStories
      .map((fav) => fav.id.toString())
      .indexOf(req.params.storyId);

    profile.favoriteStories[addIndex].likes.push(req.user.id);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//unLike favorite stories

router.put(
  '/:id/unlikeFavoriteStory/:storyId',
  [middleware],
  async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }
      let array = profile.favoriteStories.find(
        (item) => item.id === req.params.storyId
      );
      if (array.likes.filter((it) => it.id === req.user.id).length === 0) {
        return res.status(404).json({ msg: 'Story is already unliked' });
      }
      let likeArray = profile.favoriteStories.find(
        (item) => item.id === req.params.storyId
      );

      likeArray = likeArray.likes.filter((item) => item.id !== req.user.id);
      const removeIndex = profile.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.storyId);

      profile.favoriteStories[removeIndex].likes = likeArray;

      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//comment favorite movies

router.put(
  '/:ownerId/commentFavoriteMovie/:movieId',
  [middleware],
  async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.ownerId);
      if (!profile) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const { comment } = req.body;
      const addIndex = profile.favoriteMovies
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      profile.favoriteMovies[addIndex].comments.push({
        user: req.user.id,
        text: comment,
        name: req.user.username,
      });
      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//comment favorite storie

router.put(
  '/:ownerId/commentFavoriteStory/:storyId',
  [middleware],
  async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.ownerId);
      if (!profile) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const { comment } = req.body;
      const addIndex = profile.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.storyId);

      profile.favoriteStories[addIndex].comments.push({
        user: req.user.id,
        text: comment,
        name: req.user.username,
      });
      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

////remove comment favorite movies

router.delete(
  '/:ownerId/deleteCommentFavoriteMovie/:movieId/:commentId',
  [middleware],
  async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.ownerId);
      if (!profile) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const removeIndex = profile.favoriteMovies
        .map((fav) => fav.id.toString())
        .indexOf(req.params.movieId);

      const comment = profile.favoriteMovies[removeIndex].comments.filter(
        (comment) => comment.id !== req.params.commentId
      );
      console.log(comment);

      /* const removeComment = profile.favoriteMovies[removeIndex].comments
        .map((fav) => fav.id.toString())
        .indexOf(req.params.commentId);*/

      // profile.favoriteMovies[removeIndex].comments.slice(removeComment, 1);
      profile.favoriteMovies[removeIndex].comments = comment;
      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

///remove comment favorite story

router.delete(
  '/:ownerId/deleteCommentFavoriteStory/:movieId/:commentId',
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
      const profile = await Profile.findById(req.params.ownerId);
      if (!profile) {
        res.status(500).json({ msg: 'There is no profile with that id' });
      }

      const removeIndex = profile.favoriteStories
        .map((fav) => fav.id.toString())
        .indexOf(req.params.storyId);

      const comment = profile.favoriteStories[removeIndex].comments.filter(
        (comment) => comment.id !== req.params.commentId
      );
      console.log(comment);

      profile.favoriteStories[removeIndex].comments = comment;
      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);
