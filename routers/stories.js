const express = require('express');
const router = express.Router();
const middleware = require('../middleware/checkLogin');
const User = require('../models/User');
const Story = require('../models/Story');
const Profile = require('../models/Profile');
const { check, validationResult } = require('express-validator/check');

//get all stories
router.get('/all', async (req, res) => {
  try {
    const story = await Story.find();
    if (!story.length > 0) {
      res.json({ msg: 'There is no story' });
    }
    res.json(story);
  } catch (error) {
    res.status(404).json({ msg: 'there is an error' });
  }
});

//get a story by id
router.get('/:id', [middleware], async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      res.status(500).json({ msg: 'There is no story with that id' });
    }
    res.json(story);
  } catch (error) {
    res.status(404).json({ msg: 'there is an error' });
  }
});

//add a story
router.post(
  '/',
  [
    middleware,
    [
      check('name', 'Enter the name story').notEmpty(),
      check('story', 'Text your story').notEmpty(),
      check('writer', 'Enter the writer name').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, story, writer, imageUrl } = req.body;
    try {
      // const user = await User.findById(req.user.id).select('-password');
      const newStory = new Story({
        name,
        story,
        writer,
        imageUrl,
        user: req.user.id,
      });

      await newStory.save();
      const stories = await Story.find();
      res.json(stories);
    } catch (error) {
      res.status(404).json({ msg: 'there is an error' });
    }
  }
);

//Like Story
router.put('/likeStory/:storyId', [middleware], async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);

    if (story.likes.filter((it) => it.id === req.user.id).length > 0) {
      return res.status(404).json({ msg: 'Stroy is already liked' });
    }

    story.likes.push({
      _id: req.user.id,
      username: req.user.username,
    });

    await story.save();
    const stories = await Story.find();
    return res.json(stories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//DisLike Story
router.put('/DislikeStory/:storyId', [middleware], async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);

    if (story.likes.filter((it) => it.id === req.user.id).length === 0) {
      return res.status(404).json({ msg: 'Stroy is already unliked' });
    }

    const removeIndex = story.likes
      .map((fav) => fav.id.toString())
      .indexOf(req.user.id);

    story.likes.splice(removeIndex, 1);

    await story.save();
    const stories = await Story.find();
    return res.json(stories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Add COMMENT Story
router.put('/commentStory/:storyId', [middleware], async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);

    const { text } = req.body;

    story.comments.push({
      user: req.user.id,
      username: req.user.username,
      text: text,
    });

    await story.save();
    const stories = await Story.find();

    return res.json(stories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Delete comment Story
router.delete(
  '/DeleteCommentStory/:storyId/:commentId',
  [middleware],
  async (req, res) => {
    try {
      const story = await Story.findById(req.params.storyId);

      /*  if (story.comments.filter((it) => it.id === req.user.id).length === 0) {
        return res
          .status(404)
          .json({ msg: 'Story comment is already deleted' });
      }
*/
      const removeIndex = story.comments
        .map((fav) => fav.id.toString())
        .indexOf(req.params.commentId);

      story.comments.splice(removeIndex, 1);

      await story.save();
      const stories = await Story.find();

      return res.json(stories);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

//Like Story
router.put('/likeStoryy/:storyId', [middleware], async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);

    if (story.likes.filter((it) => it.id === req.user.id).length > 0) {
      return res.status(404).json({ msg: 'Stroy is already liked' });
    }

    story.likes.push({
      _id: req.user.id,
      username: req.user.username,
    });

    await story.save();
    return res.json(story);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//DisLike Story
router.put('/DislikeStoryy/:storyId', [middleware], async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);

    if (story.likes.filter((it) => it.id === req.user.id).length === 0) {
      return res.status(404).json({ msg: 'Stroy is already unliked' });
    }

    const removeIndex = story.likes
      .map((fav) => fav.id.toString())
      .indexOf(req.user.id);

    story.likes.splice(removeIndex, 1);

    await story.save();

    return res.json(story);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
