import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ experience: { band, position, from, to, description } }) => (
  <div>
    <strong>
      {position} in {band}
    </strong>

    <p>
      <Moment format="MMM YYYY">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="MMM YYYY">{to}</Moment>}
    </p>

    <p>{description}</p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
