import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    position,
    band,
    location,
    instruments,
  },
}) => {
  return (
    <div className="profile-item bg-light">
      <Link to={`/profile/user/${_id}`}>
        <img src={avatar} alt="" className="round-img" />
      </Link>
      <div>
        <Link to={`/profile/user/${_id}`}>
          {" "}
          <h3>{name}</h3>{" "}
        </Link>
        <p>
          {position} {band && <span> at {band}</span>}{" "}
        </p>
        <p className="my">{location && <span>{location}</span>}</p>
        <Link to={`/profile/user/${_id}`} className="btn btn-primary btn-small mt-05">
          View profile
        </Link>
      </div>
      <ul>
        {instruments.slice(0, 4).map((instrument, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-music" /> {instrument}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
