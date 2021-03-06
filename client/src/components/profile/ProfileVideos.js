import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ReactPlayer from "react-player";

const ProfileVideos = ({ videos }) => {
  return (
    <div className="profile-videos bg-light">
      <h2 className="text-primary m"> My videos </h2>
      {videos === null || videos === undefined ? (
        <Spinner />
      ) : (
        <div className="videos-container">
          {videos.map((video, index) => (
            <div className="player-wrapper" key={index}>
              <ReactPlayer
                className="react-player"
                url={video}
                controls={true}
                width="100%"
                height="100%"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ProfileVideos.propTypes = {
  videos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  videos: state.profile.profile.videos
});

export default connect(mapStateToProps)(ProfileVideos);
