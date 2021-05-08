import axios from 'axios';
import setAlert from './alert';
import setAuthToken from '../../setAuthToken/setAuthToken';
import { GET_MOVIES, GET_STORIES } from './profile';
export const REGISTER = 'REGISTER';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      dispatch({
        type: GET_MOVIES,
        payload: res.data.favoriteMovies,
      });
      dispatch({
        type: GET_STORIES,
        payload: res.data.favoriteStories,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
};

export const register = (username, email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, email, password });
    try {
      const res = await axios.post('/api/register', body, config);
      dispatch({
        type: REGISTER,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/auth', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(err);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    console.log('logout');
    dispatch({ type: LOGOUT });
  };
};
