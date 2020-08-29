import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  return (
    <>
      <form
        className="form my-1 post-form"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text: text, trackId: "" });
          setText("");
        }}>
        <textarea
          className="post-input radius-1 bg-tr-white fw-500 text-primary p-1"
          name="text"
          cols="30"
          rows="5"
          placeholder="What's on your mind?"
          value={text}
          required
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <input
          type="submit"
          className="btn btn-primary radius-05 submit-post m-0"
          value="Post"
        />
      </form>
    </>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
