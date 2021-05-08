import { v4 as uuidv4 } from 'uuid';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

const setAlert = (msg, alertType, timeout = 5000) => {
  return (dispatch) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, msg, alertType, id });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, timeout);
  };
};

export default setAlert;
