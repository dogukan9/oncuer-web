import { SET_ALERT, REMOVE_ALERT } from '../actions/alert';
const initialState = {
  alerts: {
    msg: null,
    alertType: null,
    id: null,
  },
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: { msg: action.msg, alertType: action.alertType, id: action.id },
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: {
          msg: null,
          alertType: null,
          id: null,
        },
      };
    default:
      return state;
  }
}
