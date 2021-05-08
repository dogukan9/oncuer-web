import axios from 'axios';

export const GET_MOVIES_AND_STORIES = 'GET_MOVIES_AND_STORIES';
export const GET_STORY = 'GET_STORY';
export const GET_MOVIE = 'GET_MOVIE';
export const MOVIE_ERROR = 'MOVIE_ERROR';
export const LIKE_MOVIE = 'LIKE_MOVIE';
export const DISLIKE_MOVIE = 'DISLIKE_MOVIE';
export const LIKE_MOVIEE = 'LIKE_MOVIEE';
export const DISLIKE_MOVIEE = 'DISLIKE_MOVIEE';
export const LIKE_STORY = 'LIKE_STORY';
export const DISLIKE_STORY = 'DISLIKE_STORY';
export const STORY_ERROR = 'STORY_ERROR';
export const LIKE_STORYY = 'LIKE_STORYY';
export const ADD_COMMENT_MOVIE = 'ADD_COMMENT_MOVIE';
export const REMOVE_COMMENT_MOVIE = 'REMOVE_COMMENT_MOVIE';
export const ADD_COMMENT_STORY = 'ADD_COMMENT_STORY';
export const REMOVE_COMMENT_STORY = 'REMOVE_COMMENT_STORY';
export const DISLIKE_STORYY = 'DISLIKE_STORYY';

export const getMoviesAndStories = () => {
  return async (dispatch) => {
    const movie = await axios.get('/api/movies');
    const story = await axios.get('/api/stories/all');

    dispatch({
      type: GET_MOVIES_AND_STORIES,
      movie: movie.data,
      story: story.data,
    });
  };
};

export const getMovie = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/movies/${id}`);
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      dispatch({ type: MOVIE_ERROR });
    }
  };
};

export const getStory = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/stories/${id}`);
      dispatch({
        type: GET_STORY,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      dispatch({ type: STORY_ERROR });
    }
  };
};

export const likeMovie = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/movies/likeMovie/${movieId}`);
      dispatch({
        type: LIKE_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};

export const dislikeMovie = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/movies/DislikeMovie/${movieId}`);
      dispatch({
        type: DISLIKE_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};
/*
export const likeMoviee = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/movies/likeMoviee/${movieId}`);
      dispatch({
        type: LIKE_MOVIEE,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};

export const dislikeMoviee = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/movies/DislikeMoviee/${movieId}`);
      dispatch({
        type: DISLIKE_MOVIEE,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};
*/
export const likeStory = (storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/stories/likeStory/${storyId}`);
      dispatch({
        type: LIKE_STORY,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};

export const dislikeStory = (storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/stories/DislikeStory/${storyId}`);
      dispatch({
        type: DISLIKE_STORY,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};
/*
export const likeStoryy = (storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/stories/likeStoryy/${storyId}`);
      dispatch({
        type: LIKE_STORYY,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};

export const dislikeStoryy = (storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/stories/DislikeStoryy/${storyId}`);
      dispatch({
        type: DISLIKE_STORYY,
        payload: res.data,
      });
    } catch (err) {
      console.log('hata');
    }
  };
};
*/
export const addCommentStory = (storyId, text) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ text });
    try {
      const res = await axios.put(
        `/api/stories/commentStory/${storyId}`,
        body,
        config
      );

      dispatch({
        type: ADD_COMMENT_STORY,
        payload: res.data,
        id: storyId,
      });
    } catch (err) {
      console.log('hata var');
    }
  };
};
export const removeCommentStory = (comId, storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/stories/DeleteCommentStory/${storyId}/${comId}`
      );
      dispatch({
        type: REMOVE_COMMENT_STORY,
        payload: res.data,
        id: storyId,
      });
    } catch (err) {
      console.log('hata var');
    }
  };
};

export const addCommentMovie = (movieId, text) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ text });
    try {
      const res = await axios.put(
        `/api/movies/commentMovie/${movieId}`,
        body,
        config
      );

      dispatch({
        type: ADD_COMMENT_MOVIE,
        payload: res.data,
        id: movieId,
      });
    } catch (err) {
      console.log('hata var');
    }
  };
};
export const removeCommentMovie = (comId, movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/movies/DeleteCommentMovie/${movieId}/${comId}`
      );
      dispatch({
        type: REMOVE_COMMENT_MOVIE,
        payload: res.data,
        id: movieId,
      });
    } catch (err) {
      console.log('hata var');
    }
  };
};
