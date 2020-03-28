import {
  UPDATE_MUSIC,
  GET_MUSIC,
  CLEAR_MUSIC,
  ADD_TRACK_COMMENT,
  MUSIC_ERROR
} from "../actions/types";

const initialState = {
  music: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MUSIC:
    case UPDATE_MUSIC:
      return {
        ...state,
        music: payload,
        loading: false
      };
    case CLEAR_MUSIC:
      return {
        ...state,
        music: null,
        loading: false
      };
    case ADD_TRACK_COMMENT:
      return {
        ...state,
        music: {
          ...state.music,
          tracks: payload
        }
      };
    case MUSIC_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
