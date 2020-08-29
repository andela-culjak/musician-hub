import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadTrack } from "../../actions/music";

const UploadTrack = ({ uploadTrack, auth }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [duration, setDuration] = useState("");
  const [label, setLabel] = useState("Choose or drop a file");
  const [postToNewsfeed, setPostToNewsfeed] = useState(true);

  const formData = new FormData();

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const readFile = (file) => {
    var reader = new FileReader();
    reader.onload = function () {
      var aud = new Audio(reader.result);
      aud.onloadedmetadata = function () {
        console.log(aud.duration);
        setFile(file);
        setLabel("Audio file chosen");
        setDuration(aud.duration);
      };
    };
    reader.readAsDataURL(file);
  };

  const onDropFile = (e) => {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    file.type === "audio/mpeg" ? readFile(file) : setLabel("Audio files only");
  };

  const onChangeFile = (e) => {
    var file = e.target.files[0];
    readFile(file);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCaption = (e) => {
    setCaption(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("track", file);
    formData.append("title", title);
    formData.append("duration", duration);
    uploadTrack(
      formData,
      postToNewsfeed
        ? `${auth.user.name.split(" ")[0]} uploaded a new track - ${title}`
        : undefined,
      postToNewsfeed ? caption : undefined
    );
    setTitle("");
    setCaption("");
    setFile(null);
    setLabel("Choose or drop a file");
  };

  return (
    <div className="my-3 bg-tr-white p-2">
      <h2 className="fw-500">Upload an audio file</h2>
      <form className="form mt-2" onSubmit={onSubmit}>
        <div className="track-upload">
          <div>
            <input
              className="mb-1"
              type="text"
              placeholder="Song title"
              id="track-title"
              value={title}
              onChange={onChangeTitle}
            />
            <input className="mb-1" type="text" placeholder="Genre" id="track-genre" />
            <input
              disabled={!postToNewsfeed}
              className="mb-1"
              placeholder="Post caption"
              type="text"
              id="caption"
              value={caption}
              onChange={onChangeCaption}
            />
            <input
              type="checkbox"
              className="mb-1"
              id="newsfeed"
              name="newsfeed"
              checked={postToNewsfeed}
              value={postToNewsfeed}
              onChange={() => {
                setPostToNewsfeed(!postToNewsfeed);
              }}
            />
            <label className="text-primary mx-025" htmlFor="newsfeed">
              Post to Newsfeed
            </label>
          </div>

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
              id="aud-file"
              accept="audio/*"
              onChange={onChangeFile}
            />
            <label className="mt-05 text-dark" htmlFor="aud-file">
              {label}
            </label>
          </div>
        </div>

        <div className="my-2">
          <input type="submit" className="btn btn-primary" />
          <Link className="btn btn-light" to="/dashboard">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

UploadTrack.propTypes = {
  uploadTrack: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadTrack })(withRouter(UploadTrack));
