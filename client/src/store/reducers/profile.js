import {
  GET_PROFILE,
  PROFILE_FAIL,
  UPDATE_PROFILE,
  ADD_FAVORITE_MOVIES,
  MOVIE_FAIL,
  REMOVE_FAVORITE_MOVIES,
  ADD_FAVORITE_STORIES,
  STORY_FAIL,
  REMOVE_FAVORITE_STORIES,
  GET_MOVIES,
  GET_STORIES,
  LIKE_FAVMOVIE,
  DISLIKE_FAVMOVIE,
  LIKE_FAVSTORY,
  DISLIKE_FAVSTORY,
  ADD_COMMENT_FAVMOVIE,
  REMOVE_COMMENT_FAVMOVIE,
  ADD_COMMENT_FAVSTORY,
  REMOVE_COMMENT_FAVSTORY,
} from '../actions/profile';

const initialState = {
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case LIKE_FAVMOVIE:
    case DISLIKE_FAVMOVIE:
    case LIKE_FAVSTORY:
    case DISLIKE_FAVSTORY:
    case ADD_COMMENT_FAVMOVIE:
    case REMOVE_COMMENT_FAVMOVIE:
    case ADD_COMMENT_FAVSTORY:
    case REMOVE_COMMENT_FAVSTORY:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };

    case PROFILE_FAIL:
      return {
        ...state,
        user: null,
      };
    case MOVIE_FAIL:
      return {
        ...state,
        favoriteMovies: null,
      };
    case STORY_FAIL:
      return {
        ...state,
        favoriteStories: null,
      };
    case ADD_FAVORITE_MOVIES:
    case REMOVE_FAVORITE_MOVIES:
    case GET_MOVIES:
      return {
        ...state,
        user: {
          ...state.user,
          favoriteMovies: action.payload,
        },
      };
    case ADD_FAVORITE_STORIES:
    case REMOVE_FAVORITE_STORIES:
    case GET_STORIES:
      return {
        ...state,
        user: {
          ...state.user,
          favoriteStories: action.payload,
        },
      };
    default:
      return state;
  }
}
