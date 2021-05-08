import {
  REGISTER,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/auth';
import {
  CHANGE_FAVORITE_STORIES,
  CHANGE_FAVORITE_MOVIES,
  SET_LIKEFAVMOVIE,
  SET_LIKEFAVSTORY,
} from '../actions/profile';
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  successRegister: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER:
      return {
        ...state,
        isAuthenticated: false,
        successRegister: true,
        loading: false,
      };
    case SET_LIKEFAVMOVIE:
    case SET_LIKEFAVSTORY:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case CHANGE_FAVORITE_MOVIES:
      return {
        ...state,
        user: {
          ...state.user,
          favoriteMovies: action.payload,
        },
      };

    case CHANGE_FAVORITE_STORIES:
      return {
        ...state,
        user: {
          ...state.user,
          favoriteStories: action.payload,
        },
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        successRegister: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        successRegister: false,
      };
    default:
      return state;
  }
}
