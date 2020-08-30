import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom"; //so we can redirect from within action using history
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    band: "",
    website: "",
    location: "",
    position: "",
    instruments: "",
    genres: "",
    influences: "",
    videos: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      band: !loading && profile && profile.band ? profile.band : "",
      website: !loading && profile && profile.website ? profile.website : "",
      location: !loading && profile && profile.location ? profile.location : "",
      position: !loading && profile && profile.position ? profile.position : "",
      instruments:
        !loading && profile && profile.instruments ? profile.instruments.join(", ") : "",
      genres: !loading && profile && profile.genres ? profile.genres.join(", ") : "",
      influences:
        !loading && profile && profile.influences ? profile.influences.join(", ") : "",
      videos: !loading && profile && profile.videos ? profile.videos.join(", ") : "",
      bio: !loading && profile && profile.bio ? profile.bio : "",
      twitter:
        !loading && profile && profile.social && profile.social.twitter
          ? profile.social.twitter
          : "",
      facebook:
        !loading && profile && profile.social && profile.social.facebook
          ? profile.social.facebook
          : "",
      linkedin:
        !loading && profile && profile.social && profile.social.linkedin
          ? profile.social.linkedin
          : "",
      youtube:
        !loading && profile && profile.social && profile.social.youtube
          ? profile.social.youtube
          : "",
      instagram:
        !loading && profile && profile.social && profile.social.instagram
          ? profile.social.instagram
          : "",
    });
    // eslint-disable-next-line
  }, [loading, getCurrentProfile]);

  const {
    band,
    website,
    location,
    position,
    instruments,
    genres,
    influences,
    videos,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large page-title">Edit Your Profile</h1>
      <p className="medium">
        <i className="fas fa-user" /> Make sure your profile stands out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Position/role"
            name="position"
            value={position}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Give us an idea of what you do at the moment
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Band"
            name="band"
            value={band}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Could be your own band or one you work for</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Could be your own or a band website</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">City and state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Instruments"
            name="instruments"
            value={instruments}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Separate by comma (eg. guitar, piano, drums)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Genres"
            name="genres"
            value={genres}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Separate by comma (eg. country, electronic, pop)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Influences"
            name="influences"
            value={influences}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Separate by comma (eg. Metallica, The Cure, David Bowie)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Your music links"
            name="videos"
            value={videos}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Paste in some links to your videos (Youtube, Vimeo, Twitch etc.) and separate
            them by comma (eg. Link1, Link2,...)
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <button
          className="btn btn-light my-1"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}>
          Go Back
        </button>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
