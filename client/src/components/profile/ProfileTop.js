import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    position,
    band,
    location,
    website,
    social,
    cover,
    user: { name, avatar, _id },
  },
}) => {
  return (
    <div
      className="profile-top box-sh-subtle bg-primary p-3"
      style={{ backgroundImage: `url(${cover})` }}>
      <div className="cover-photo-overlay"></div>

      <div className="avatar-container py-2">
        <img className="round-img main-avatar" src={avatar} alt="" />
      </div>

      <div className="heading-items py-3 pl-2 pl-sm-1">
        <h1 className="large txt-shadow-dark-lg">{name}</h1>

        <p className="lead txt-shadow-dark">
          {position} {band && <span> {"at " + band} </span>}
        </p>
        <p className="txt-shadow-dark medium">{location && <span> {location} </span>}</p>
        <div className="icons mt-05">
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-1x" />
            </a>
          )}

          {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-1x" />
            </a>
          )}

          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-1x" />
            </a>
          )}

          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-1x" />
            </a>
          )}

          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-1x" />
            </a>
          )}

          {social && social.instagram && (
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-1x" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
