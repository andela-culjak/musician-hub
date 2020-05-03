import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrackComment } from "../../../actions/music";
import MainTrack from "./MainTrack";

const AudioTracks = ({ music, auth, addTrackComment }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  useEffect(() => {
    setCurrentTrackIndex(Math.floor(Math.random() * music.tracks.length));
  }, []);

  return (
    <div className="audio-tracks">
      <h2 className="my-2">{music.user.name.split(" ")[0]}'s Tracks</h2>
      {currentTrackIndex !== null && (
        <MainTrack
          currentTrackIndex={currentTrackIndex}
          music={music}
          auth={auth}
          addTrackComment={addTrackComment}
        />
      )}
    </div>
  );
};

AudioTracks.propTypes = {
  addTrackComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addTrackComment })(AudioTracks);
