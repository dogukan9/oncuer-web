import axios from 'axios';
import setAlert from './alert';

export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_FAIL = 'PROFILE_FAIL';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const USER_LOADED = 'USER_LOADED';
export const ADD_FAVORITE_MOVIES = 'ADD_FAVORITE_MOVIES';
export const REMOVE_FAVORITE_MOVIES = 'REMOVE_FAVORITE_MOVIES';
export const CHANGE_FAVORITE_MOVIES = 'ADD_FAVORITE_MOVIES';
export const ADD_FAVORITE_STORIES = 'ADD_FAVORITE_STORIES';
export const REMOVE_FAVORITE_STORIES = 'REMOVE_FAVORITE_STORIES';
export const CHANGE_FAVORITE_STORIES = 'ADD_FAVORITE_STORIES';
export const MOVIE_FAIL = 'MOVIE_FAIL';
export const STORY_FAIL = 'STORY_FAIL';
export const GET_MOVIES = 'GET_MOVIES';
export const GET_STORIES = 'GET_STORIES';
export const REMOVE_COMMENT_FAVMOVIE = 'REMOVE_COMMENT_FAVMOVIE';
export const ADD_COMMENT_FAVMOVIE = 'ADD_COMMENT_FAVMOVIE';
export const DISLIKE_FAVSTORY = 'DISLIKE_FAVSTORY';
export const LIKE_FAVSTORY = 'LIKE_FAVSTORY';
export const DISLIKE_FAVMOVIE = 'DISLIKE_FAVMOVIE';
export const LIKE_FAVMOVIE = 'LIKE_FAVMOVIE';
export const SET_LIKEFAVMOVIE = 'SET_LIKEFAVMOVIE';
export const SET_LIKEFAVSTORY = 'SET_LIKEFAVSTORY';
export const SET_COMMENTFAVMOVIE = 'SET_COMMENTFAVMOVIE';
export const SET_COMMENTFAVSTORY = 'SET_COMMENTFAVSTORY';
export const REMOVE_COMMENT_FAVSTORY = 'REMOVE_COMMENT_FAVSTORY';
export const ADD_COMMENT_FAVSTORY = 'ADD_COMMENT_FAVSTORY';
export const updateProfile = (age, bio) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ age, bio });

    try {
      const res = await axios.post('/api/auth/edit', body, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(err);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_FAIL,
      });
    }
  };
};

export const getProfileById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/auth/${id}`);
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_FAIL,
      });
    }
  };
};

export const addFavoriteMovies = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/auth/addFavoriteMovie/${movieId}`);
      dispatch({
        type: CHANGE_FAVORITE_MOVIES,
        payload: res.data,
      });
      dispatch({
        type: ADD_FAVORITE_MOVIES,
        payload: res.data,
      });
    } catch {
      dispatch({
        type: MOVIE_FAIL,
      });
    }
  };
};

export const removeFavoriteMovies = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/auth/removeFavoriteMovie/${movieId}`
      );
      dispatch({
        type: CHANGE_FAVORITE_MOVIES,
        payload: res.data,
      });
      dispatch({
        type: REMOVE_FAVORITE_MOVIES,
        payload: res.data,
      });
    } catch {
      dispatch({
        type: MOVIE_FAIL,
      });
    }
  };
};

export const getFavMovies = (movies) => {
  return { type: GET_MOVIES, payload: movies };
};

export const addFavoriteStories = (storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/auth/addFavoriStory/${storyId}`);
      dispatch({
        type: CHANGE_FAVORITE_STORIES,
        payload: res.data,
      });
      dispatch({
        type: ADD_FAVORITE_STORIES,
        payload: res.data,
      });
    } catch {
      dispatch({
        type: STORY_FAIL,
      });
    }
  };
};

export const removeFavoriteStories = (storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/auth/removeFavoriteStory/${storyId}`
      );
      dispatch({
        type: CHANGE_FAVORITE_STORIES,
        payload: res.data,
      });
      dispatch({
        type: REMOVE_FAVORITE_STORIES,
        payload: res.data,
      });
    } catch {
      dispatch({
        type: STORY_FAIL,
      });
    }
  };
};

export const getFavStories = (stories) => {
  return { type: GET_STORIES, payload: stories };
};

export const addCommentFavStory = (storyId, ownerId, userId, comment) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ comment });
    try {
      const res = await axios.put(
        `/api/auth/commentFavoriteStory/${storyId}/${ownerId}`,
        body,
        config
      );

      dispatch({
        type: ADD_COMMENT_FAVSTORY,
        payload: res.data,
        id: storyId,
      });
      if (userId === ownerId) {
        dispatch({
          type: SET_COMMENTFAVSTORY,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata var');
    }
  };
};
export const removeCommentFavStory = (comId, ownerId, userId, storyId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/auth/deleteCommentFavoriteStory/${storyId}/${comId}/${ownerId}`
      );
      dispatch({
        type: REMOVE_COMMENT_FAVSTORY,
        payload: res.data,
        id: storyId,
      });
      if (ownerId === userId) {
        dispatch({
          type: SET_COMMENTFAVSTORY,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata var');
    }
  };
};

export const likeFavStory = (storyId, ownId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/api/auth/likeFavoriteStory/${storyId}/${ownId}`
      );
      dispatch({
        type: LIKE_FAVSTORY,
        payload: res.data,
      });
      if (userId === ownId) {
        dispatch({
          type: SET_LIKEFAVSTORY,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata');
    }
  };
};

export const dislikeFavStory = (storyId, ownId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/api/auth/unlikeFavoriteStory/${storyId}/${ownId}`
      );
      dispatch({
        type: DISLIKE_FAVSTORY,
        payload: res.data,
      });
      if (userId === ownId) {
        dispatch({
          type: SET_LIKEFAVSTORY,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata');
    }
  };
};

export const addCommentFavMovie = (movieId, ownerId, userId, comment) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ comment });
    try {
      const res = await axios.put(
        `/api/auth/commentFavoriteMovie/${movieId}/${ownerId}`,
        body,
        config
      );

      dispatch({
        type: ADD_COMMENT_FAVMOVIE,
        payload: res.data,
        id: movieId,
      });
      if (userId === ownerId) {
        dispatch({
          type: SET_COMMENTFAVMOVIE,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata var');
    }
  };
};
export const removeCommentFavMovie = (comId, ownerId, userId, movieId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/auth/deleteCommentFavoriteMovie/${movieId}/${comId}/${ownerId}`
      );
      dispatch({
        type: REMOVE_COMMENT_FAVMOVIE,
        payload: res.data,
        id: movieId,
      });
      if (userId === ownerId) {
        dispatch({
          type: SET_COMMENTFAVMOVIE,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata var');
    }
  };
};
export const likeFavMovie = (movieId, ownId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/api/auth/likeFavoriteMovie/${movieId}/${ownId}`
      );
      dispatch({
        type: LIKE_FAVMOVIE,
        payload: res.data,
      });
      if (userId === ownId) {
        dispatch({
          type: SET_LIKEFAVMOVIE,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata');
    }
  };
};

export const dislikeFavMovie = (movieId, ownId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/api/auth/unlikeFavoriteMovie/${movieId}/${ownId}`
      );
      dispatch({
        type: DISLIKE_FAVMOVIE,
        payload: res.data,
      });

      if (userId === ownId) {
        dispatch({
          type: SET_LIKEFAVMOVIE,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log('hata');
    }
  };
};
