import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DashboardActions = (user) => {
  /*if (user) {
    console.log(user);
  }*/
  return (
    <div className="dash-buttons">
      <Link to="edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link to="add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary" /> Add Experience
      </Link>
      <Link to="upload-avatar" className="btn btn-light">
        <i className="fas fa-user text-primary" /> Change profile picture
      </Link>
      <Link to="manage-tracks" className="btn btn-light">
        <i className="fas fa-music text-primary" /> My music
      </Link>
      {user && (
        <Link to={`/profile/user/${user.user._id}`} className="btn btn-light">
          <i className="fas fa-user text-primary" /> View Profile
        </Link>
      )}
    </div>
  ); //ZAŠTO ovo radi?? user.user._id
};

DashboardActions.propTypes = {
  user: PropTypes.object.isRequired,
};

export default DashboardActions;
