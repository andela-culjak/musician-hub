import React from "react";

export const formatTime = (value) => {
  return [
    Math.floor((value % 3600) / 60), // minutes
    ("00" + Math.floor(value % 60)).slice(-2), // seconds
  ].join(":");
};

const Track = ({ track, currentTrackId, trackSelected }) => {
  return (
    <div
      className={`${
        currentTrackId === track._id ? "bg-tr-dark" : "bg-tr-white "
      } playlist-item box-sh-dark my-1 p-1 p-sm-05`}
      onClick={() => trackSelected(track._id)}>
      <h4 className="medium fw-400">{track.title}</h4>
      <div>
        {track.likes.length > 0 && (
          <span className="likes-number mx-025">
            {track.likes.length + " "} <i className="far fa-heart" />
          </span>
        )}

        <span className="song-length mx-025">{formatTime(track.duration)}</span>
      </div>
    </div>
  );
};

export default Track;
