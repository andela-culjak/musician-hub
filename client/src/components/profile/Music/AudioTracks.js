import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrackComment } from "../../../actions/music";
import MainTrack from "./MainTrack";
import Track from "./Track";

const AudioTracks = ({ music, auth, addTrackComment }) => {
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

        <MainTrack
          currentTrackIndex={currentTrackIndex}
          music={music}
          auth={auth}
          addTrackComment={addTrackComment}
        />

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

AudioTracks.propTypes = {
  addTrackComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addTrackComment })(AudioTracks);
