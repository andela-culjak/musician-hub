import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = user => {
  return (
    <div className="dash-buttons">
      <Link to="edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link to="add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary" /> Add Experience
      </Link>
      <Link to="add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary" /> Add Education
      </Link>
      <Link to="upload-avatar" className="btn btn-light">
        <i className="fas fa-user text-primary" /> Change profile picture
      </Link>
      <Link to={`/profile/${user._id}`} className="btn btn-light">
        <i className="fas fa-user text-primary" /> View Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
