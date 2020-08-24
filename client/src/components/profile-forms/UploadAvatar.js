import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadAvatar } from "../../actions/profile";

const UploadAvatar = ({ uploadAvatar, history }) => {
  const [file, setFile] = useState("");
  const [label, setLabel] = useState("Choose a file");

  const formData = new FormData();

  const onChange = (e) => {
    setFile(e.target.files[0]); // because this is a single file upload
    setLabel("Image file chosen");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("file", file);
    uploadAvatar(formData, history);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Update Profile Photo</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="file" id="img-file" accept="image/*" onChange={onChange} />
          <label htmlFor="img-file"> {label} </label>
        </div>

        <input type="submit" className="btn btn-primary" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

UploadAvatar.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
};

export default connect(null, { uploadAvatar })(withRouter(UploadAvatar));
