import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    position,
    band,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-3">
      <div>
        <img className="round-img " src={avatar} alt="" />
      </div>

      <div className="heading-items py-1 px-2">
        <h1 className="large">{name}</h1>

        <p className="lead">
          {position} {band && <span> {band && "at " + band} </span>}
        </p>
        <p>{location && <span> {location} </span>}</p>
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
