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
  const backup = "img/misc/bcg1.png";

  return (
    <div className="box-sh-subtle">
      <div className="profile-item bg-tr-white">
        <Link to={`/profile/user/${_id}`}>
          <div
            className="card-cover"
            style={{ backgroundImage: `url(${thumbnail || backup})` }}></div>

          <img src={avatar} alt="" className="round-img card-avatar" />

          <div className="card-info mt-2">
            <h2 className="text-right txt-shadow-primary lead">{name}</h2>

            <div>
              <p className="text-right fw-600">
                {position} {band && <> at {band} </>}
              </p>
              <p className="text-right my">{location && <span>{location}</span>}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className=" bg-tr-white card-genres p-05">
        <ul>
          {genres.slice(0, 4).map((genre, index) => (
            <li key={index} className="text-primary fw-500">
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
