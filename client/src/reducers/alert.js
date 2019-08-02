import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; //existing state (initially empty) plus msg, id and alert type
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); //existing state without the currently showing alert
    default:
      return state;
  }
}
