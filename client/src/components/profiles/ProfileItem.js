import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    band,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <Link to={`/profile/user/${_id}`}>
        <img src={avatar} alt="" className="round-img" />
      </Link>
      <div>
        <Link to={`/profile/user/${_id}`}>
          {" "}
          <h2>{name}</h2>{" "}
        </Link>
        <p>
          {status} {band && <span> at {band}</span>}{" "}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/user/${_id}`} className="btn btn-primary">
          View profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
