import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadCover } from "../../actions/profile";

const UploadCover = ({ uploadCover, history }) => {
  const [file, setFile] = useState("");
  const [label, setLabel] = useState("Choose a file");

  const formData = new FormData();

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setLabel("Image file chosen");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("file", file);
    uploadCover(formData, history);
  };

  return (
    <div className="p-3">
      <h1 className="large text-primary">Update A Cover Photo</h1>
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

UploadCover.propTypes = {
  uploadCover: PropTypes.func.isRequired,
};

export default connect(null, { uploadCover })(withRouter(UploadCover));
