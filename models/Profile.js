const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  username: {
    type: mongoose.Schema.Types.String,
    ref: 'users',
  },
  age: {
    type: Number,
  },
  bio: {
    type: String,
  },
  favoriteMovies: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
      },
      name: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
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
          user: {
            type: mongoose.Schema.Types.ObjectId,
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
    },
  ],
  favoriteStories: [
    {
      storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'storys',
      },
      name: {
        type: String,
      },
      story: {
        type: String,
      },
      writer: {
        type: String,
      },
      imageUrl: {
        type: String,
        require: true,
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
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
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
