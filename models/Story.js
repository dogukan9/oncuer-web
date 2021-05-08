const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  name: {
    type: String,
    require: true,
  },
  story: {
    type: String,
    require: true,
  },
  writer: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },

  likes: [
    {
      username: {
        type: mongoose.Schema.Types.String,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      username: {
        type: mongoose.Schema.Types.String,
        ref: 'users',
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('story', StorySchema);
