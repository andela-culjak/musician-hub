import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    position,
    band,
    location,
    genres,
    thumbnail,
  },
}) => {
  return (
    <div>
      <div className="profile-item bg-light ">
        <Link to={`/profile/user/${_id}`}>
          <div
            className="card-cover"
            style={{ backgroundImage: `url(${thumbnail})` }}></div>

          <img src={avatar} alt="" className="round-img card-avatar" />

          <div className="card-info mt-2">
            <h1 className="text-right">{name}</h1>

            <div>
              <p className="text-right bold">
                {position} {band && <> at {band} </>}
              </p>
              <p className="text-right my">{location && <span>{location}</span>}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className=" bg-primary card-genres p-05">
        <ul>
          {genres.slice(0, 4).map((genre, index) => (
            <li key={index} className="text-primary bold">
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
