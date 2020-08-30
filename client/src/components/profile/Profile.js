import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import About from "./About/About";
import ProfileVideos from "./ProfileVideos";
import AudioTracks from "./Music/AudioTracks";
import { getProfileById } from "../../actions/profile";
import { getMusicById } from "../../actions/music";
import Dashboard from "../dashboard/Dashboard";

const Profile = ({
  getProfileById,
  getMusicById,
  profile: { profile, loading },
  music,
  auth,
  match,
  history,
}) => {
  const categories = ["music", "videos", "about"];
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProfileById(match.params.id, history);
    getMusicById(match.params.id);
  }, [getProfileById, getMusicById, match.params.id, history]);

  useEffect(() => {
    switch (true) {
      case auth && profile && auth.isAuthenticated && auth.user._id === profile.user._id:
        setCategory("dashboard");
        break;
      case music && music.tracks.length > 0:
        setCategory("music");
        break;
      default:
        setCategory("about");
    }
  }, [music, auth, profile]);

  return (
    <Fragment>
      {!profile || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profile-grid">
            <ProfileTop profile={profile} />

            <div className="profile-nav box-sh-subtle bg-tr-dim p-1 p-sm-05">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`nav-category mx-1 mx-sm-05 ${
                    cat === category && "selected"
                  }`}>
                  {cat.toUpperCase()}
                </button>
              ))}

              {auth &&
                auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <button
                    onClick={() => setCategory("dashboard")}
                    className={`nav-category mx-1 mx-sm-05 ${
                      "dashboard" === category && "selected"
                    }`}>
                    DASHBOARD
                  </button>
                )}
            </div>

            {category === "music" &&
              (music && music.tracks.length > 0 ? (
                <AudioTracks music={music} />
              ) : (
                <div className="audio-tracks bg-tr-primary  p-1">
                  <h3>This user has not added any music tracks yet.</h3>
                </div>
              ))}

            {category === "about" && <About profile={profile} />}

            {category === "videos" && <ProfileVideos />}

            {category === "dashboard" && <Dashboard />}
          </div>
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
