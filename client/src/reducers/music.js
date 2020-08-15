import {
  UPDATE_MUSIC,
  REMOVE_TRACK,
  GET_MUSIC,
  CLEAR_MUSIC,
  ADD_TRACK_COMMENT,
  UPDATE_TRACK_LIKES,
  MUSIC_ERROR,
} from "../actions/types";

const initialState = {
  music: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MUSIC:
      return {
        ...state,
        music: payload,
        loading: false,
      };
    case UPDATE_MUSIC:
      return {
        ...state,
        music: {
          ...state.music,
          tracks: [...state.music.tracks, payload],
        },
        loading: false,
      };

    case REMOVE_TRACK:
      return {
        ...state,
        music: {
          ...state.music,
          tracks: state.music.tracks.filter(
            (track) => track.url !== `/uploads/tracks/${payload.user}/${payload.name}`
          ),
        },
        loading: false,
      };
    case CLEAR_MUSIC:
      return {
        ...state,
        music: null,
        loading: false,
      };
    case ADD_TRACK_COMMENT:
      return {
        ...state,
        music: {
          ...state.music,
          tracks: payload,
        },
      };
    case UPDATE_TRACK_LIKES:
      return {
        ...state,
        music: {
          ...state.music,
          tracks: state.music.tracks.map((track) =>
            track._id === payload.trackId ? { ...track, likes: payload.likes } : track
          ),
        },
      };
    case MUSIC_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
