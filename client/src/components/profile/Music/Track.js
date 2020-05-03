import React from "react";

export const formatTime = value => {
  return [
    Math.floor((value % 3600) / 60), // minutes
    ("00" + Math.floor(value % 60)).slice(-2) // seconds
  ].join(":");
};

const Track = ({ track, currentTrackId, trackSelected }) => {
  return (
    <div
      className={`${
        currentTrackId === track._id ? "bg-light" : "bg-white"
      } playlist-item my-1 p-1`}
      onClick={() => trackSelected(track._id)}>
      <h4>{track.title}</h4>
      <h4>{formatTime(track.duration)}</h4>
    </div>
  );
};

export default Track;
