import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    instruments,
    genres,
    influences,
    user: { name },
  },
}) => (
  <div className="profile-info bg-light p-2">
    {bio && (
      <Fragment>
        <h4 className="text-primary my-05">{name.split(" ")[0]}'s Bio</h4>
        <p>{bio}</p>
        <div className="line" />
      </Fragment>
    )}

    <h4 className="text-primary my-05">Instruments</h4>
    <div className="instruments">
      {instruments.map((instrument, index) => (
        <span key={index} className="mr-025 px-025 info-list-item">
          {instrument}
        </span>
      ))}
    </div>

    {genres.length > 0 && (
      <Fragment>
        <div className="line" />
        <h4 className="text-primary my-05">Genres</h4>
        <div className="genres">
          {genres.map((genre, index) => (
            <span key={index} className="mr-025 px-025 info-list-item">
              {genre}
            </span>
          ))}
        </div>
      </Fragment>
    )}

    {influences.length > 0 && (
      <Fragment>
        <div className="line" />
        <h4 className="text-primary my-05">Influences</h4>
        <div className="influences">
          {influences.map((influence, index) => (
            <span key={index} className="mr-025 px-025 info-list-item">
              {influence}
            </span>
          ))}
        </div>
      </Fragment>
    )}
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
