const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  name: {
    type: String,

    require: true,
  },
  category: {
    type: String,
    required: true,
  },
  director: {
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
        ref: 'users',
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

module.exports = mongoose.model('movie', MovieSchema);
