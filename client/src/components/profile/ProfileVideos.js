import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

const ProfileVideos = ({ videos }) => {
  return (
    <div className="profile-videos bg-tr-primary  p-1 ">
      {videos.length > 0 ? (
        <div className="videos-container ">
          {videos.map((video, index) => (
            <div className="player-wrapper my-2" key={index}>
              <ReactPlayer
                light={true}
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
