import React, { useState, useEffect } from "react";
import MainTrack from "./MainTrack";
import Track from "./Track";

const AudioTracks = ({ music }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  useEffect(() => {
    setCurrentTrackIndex(Math.floor(Math.random() * music.tracks.length));
  }, []);

  const changeTrack = selectedTrackId => {
    setCurrentTrackIndex(music.tracks.findIndex(x => x._id === selectedTrackId));
  };

  if (currentTrackIndex !== null) {
    return (
      <div className="audio-tracks">
        <h2 className="my-2">{music.user.name.split(" ")[0]}'s Tracks</h2>

        <MainTrack currentTrackIndex={currentTrackIndex} music={music} />

        <div className="playlist">
          {music.tracks.map(track => (
            <Track
              key={track._id}
              track={track}
              currentTrackId={music.tracks[currentTrackIndex]._id}
              trackSelected={changeTrack}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default AudioTracks;
