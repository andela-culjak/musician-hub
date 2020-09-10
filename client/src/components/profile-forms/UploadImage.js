import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadCover } from "../../actions/profile";
import { uploadAvatar } from "../../actions/profile";

const UploadImage = ({ uploadCover, uploadAvatar, history, type }) => {
  const [file, setFile] = useState("");
  const [label, setLabel] = useState("Choose or drag a file");

  const formData = new FormData();

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const onDropFile = (e) => {
    e.preventDefault();

    const validTypes = ["image/jpg", "image/png", "image/jpeg"];
    var upload = e.dataTransfer.files[0];
    if (validTypes.indexOf(upload.type) !== -1) {
      setFile(upload);
      setLabel("File chosen");
    } else {
      setLabel("Image files only");
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setLabel("File chosen");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("file", file);
    switch (type) {
      case "cover":
        uploadCover(formData, history);
        break;
      case "avatar":
        uploadAvatar(formData, history);
        break;
      default:
        console.log("Error");
    }
    setLabel("Choose or drop a file");
  };

  return (
    <div>
      <h1 className="medium fw-500">
        {type === "avatar" ? (
          <>
            <i className="far fa-user"></i> Update Profile Photo
          </>
        ) : (
          <>
            <i className="far fa-image"></i> Update Cover Photo
          </>
        )}
      </h1>
      <form className="form my-1" onSubmit={onSubmit}>
        <div
          onDrop={onDropFile}
          onDragEnter={preventDefault}
          onDragLeave={preventDefault}
          onDragOver={preventDefault}
          className="text-center drop-zone">
          <i className="far fa-arrow-alt-circle-up fa-3x"></i>
          <input
            className="mb-1 "
            type="file"
            id="img-file"
            accept="image/*"
            onChange={onChange}
          />
          <label className="mt-05 pb-3 text-dark" htmlFor="img-file">
            {label}
          </label>
        </div>

        <input disabled={!file} type="submit" className="btn btn-primary" />
        <button
          className="btn btn-light my-1"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}>
          Go Back
        </button>
      </form>
    </div>
  );
};

UploadImage.propTypes = {
  type: PropTypes.string.isRequired,
  uploadCover: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

export default connect(null, { uploadCover, uploadAvatar })(withRouter(UploadImage));
