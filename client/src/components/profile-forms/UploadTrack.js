import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadTrack } from "../../actions/profile";

const UploadTrack = ({ uploadTrack, history }) => {
  const [file, setFile] = useState("");
  const [label, setLabel] = useState("Choose a file");

  const formData = new FormData();

  const onChange = e => {
    setFile(e.target.files[0]); // because this is a single file upload
    setLabel("Audio file chosen");
  };

  const onSubmit = async e => {
    e.preventDefault();
    formData.append("file", file);
    uploadTrack(formData, history);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Upload an audio file</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="file"
            id="aud-file"
            accept="audio/*"
            onChange={onChange}
          />
          <label htmlFor="aud-file"> {label} </label>
        </div>

        <input type="submit" className="btn btn-primary" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

UploadTrack.propTypes = {
  uploadTrack: PropTypes.func.isRequired
};

export default connect(null, { uploadTrack })(withRouter(UploadTrack));
