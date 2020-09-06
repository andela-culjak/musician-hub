import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom"; //so we can redirect from within action using history
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
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
    <div className="edit-profile">
      <h1 className="large page-title">Create Your Profile</h1>
      <p className="medium">
        <i className="fas fa-user" /> Let's get some information to make your profile
        stand out
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
          <small className="form-text">Could be your own band or a collaboration</small>
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
            Separate by comma (eg. guitar, piano, vocals)
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
          <small className="form-text">Tell us about yourself</small>
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
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
