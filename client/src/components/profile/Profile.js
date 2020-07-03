import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileVideos from "./ProfileVideos";
import AudioTracks from "./Music/AudioTracks";
import { getProfileById } from "../../actions/profile";
import { getMusicById } from "../../actions/music";

const Profile = ({
  getProfileById,
  getMusicById,
  profile: { profile, loading },
  music,
  auth,
  match,
  history,
}) => {
  useEffect(() => {
    getProfileById(match.params.id, history);
    getMusicById(match.params.id);
  }, [getProfileById, getMusicById, match.params.id, history]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profile-grid">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience key={experience._id} experience={experience} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experiences listed </h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation key={education._id} education={education} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education listed </h4>
              )}
            </div>

            {music && music.tracks.length > 0 ? (
              <AudioTracks music={music} />
            ) : (
              <div className="audio-tracks bg-white p-1">
                <h3>This used has not added any music tracks yet.</h3>
              </div>
            )}

            <ProfileVideos name={profile.user.name} />
          </div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/dashboard" className="btn btn-dark my-1">
                Manage My Profile
              </Link>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getMusicById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  music: PropTypes.object,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  music: state.music.music,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, getMusicById })(
  withRouter(Profile)
);
