import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrackComment } from "../../../actions/music";
import MainTrack from "./MainTrack";

const AudioTracks = ({ music, auth, addTrackComment }) => {
  return (
    <div className="audio-tracks">
      <h2 className="my-2">{music.user.name.split(" ")[0]}'s Tracks</h2>
      <MainTrack music={music} auth={auth} addTrackComment={addTrackComment} />
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
