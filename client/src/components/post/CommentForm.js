import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div className="comment-form">
      <div className="bg-tr-dim box-sh-subtle radius-05 p-05 ">
        <h3>Leave a comment</h3>
      </div>
      <form
        className="form my-1 post-form"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}>
        <textarea
          className="post-input radius-1 p-1"
          name="text"
          cols="30"
          rows="5"
          placeholder="What do you think?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="submit"
          className="btn btn-dark radius-05 submit-post m-0"
          value="Comment"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
