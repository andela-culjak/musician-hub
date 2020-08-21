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
  const [label, setLabel] = useState("Choose a file");
  const [postToNewsfeed, setPostToNewsfeed] = useState(false);

  const formData = new FormData();

  const onChangeFile = (e) => {
    var file = e.target.files[0];
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
    setLabel("Choose a file");
  };

  return (
    <div className="my-3">
      <h2>Upload an audio file</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="file" id="aud-file" accept="audio/*" onChange={onChangeFile} />
          <input type="text" id="track-title" value={title} onChange={onChangeTitle} />
          <label htmlFor="aud-file"> {label} </label>
        </div>

        <p>
          <input
            type="checkbox"
            name="newsfeed"
            checked={postToNewsfeed}
            value={postToNewsfeed}
            onChange={() => {
              setPostToNewsfeed(!postToNewsfeed);
            }}
          />{" "}
          Post to Newsfeed
        </p>

        <input
          disabled={!postToNewsfeed}
          type="text"
          id="caption"
          value={caption}
          onChange={onChangeCaption}
        />

        <input type="submit" className="btn btn-primary" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
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
