import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

const ProfileVideos = ({ videos, name }) => {
  return (
    <div className="profile-videos bg-light p-2 p-sm-1">
      <h2>{name.split(" ")[0]}'s Videos</h2>
      {videos.length > 0 ? (
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
      ) : (
        <h4 className="m">No videos yet.</h4>
      )}
    </div>
  );
};

ProfileVideos.propTypes = {
  videos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  videos: state.profile.profile.videos,
});

export default connect(mapStateToProps)(ProfileVideos);
