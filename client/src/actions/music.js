import axios from "axios";
import { setAlert } from "./alert";

import {
  UPDATE_MUSIC,
  REMOVE_TRACK,
  MUSIC_ERROR,
  ADD_TRACK_COMMENT,
  GET_MUSIC,
  UPDATE_TRACK_LIKES
} from "./types";

//Get music by id
export const getMusicById = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/music/user/${user_id}`);
    dispatch({
      type: GET_MUSIC,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MUSIC_ERROR,
      payload: {
        /* msg: err.response.statusText, status: err.response.status */
      }
    });
  }
};

//Upload tracks
export const uploadTrack = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const res = await axios.post("/api/music/upload-track", formData, config);

    dispatch({
      type: UPDATE_MUSIC,
      payload: res.data
    });

    dispatch(setAlert("Tracks updated", "success"));
  } catch (err) {
    dispatch({
      type: MUSIC_ERROR,
      payload: { statusText: "Some error", status: 400 }
    });
  }
};

//Delete a track
export const deleteTrack = (trackName, musicId) => async dispatch => {
  try {
    await axios.delete(`/api/music/remove-track/${musicId}/${trackName}`);

    dispatch({
      type: REMOVE_TRACK,
      payload: trackName
    });

    dispatch(setAlert("Track removed", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: MUSIC_ERROR,
      payload: { statusText: "Something went wrong. Track is not deleted.", status: 400 }
    });
  }
};

//Add comment on a track
export const addTrackComment = (formData, musicId, trackId) => async dispatch => {
  const config = {
    "Content-Type": "application/json"
  };

  try {
    const res = await axios.post(
      `/api/music/comment/${musicId}/${trackId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_TRACK_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Track comment added", "success"));
  } catch (err) {
    dispatch({
      type: MUSIC_ERROR,
      payload: {
        msg: err.message || "Server fail",
        status: err.status || 500
      }
    });
  }
};

//Like a track
export const likeATrack = (musicId, trackId) => async dispatch => {
  try {
    const res = await axios.put(`/api/music/like/${musicId}/${trackId}`);

    dispatch({
      type: UPDATE_TRACK_LIKES,
      payload: { trackId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: MUSIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Unlike a track
export const unlikeATrack = (musicId, trackId) => async dispatch => {
  try {
    const res = await axios.put(`/api/music/unlike/${musicId}/${trackId}`);

    dispatch({
      type: UPDATE_TRACK_LIKES,
      payload: { trackId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: MUSIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
