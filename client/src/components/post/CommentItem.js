import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, user, date },
  auth,
  deleteComment,
}) => (
  <div className="comment p-05">
    <div className="author">
      {user._id ? (
        <Link to={`/profile/user/${user._id}`}>
          <img className="round-img" src={user.avatar} alt="" />
          <h5>{user.name}</h5>
        </Link>
      ) : (
        <h5>Deleted User</h5>
      )}

      <p className="post-date">
        <Moment fromNow>{date}</Moment>
      </p>
    </div>

    <div>
      <div className="comment-text speech-bubble txt-shadow-dark px-1 py-05">
        <p className="medium-small">{text}</p>

        {!auth.loading && user._id === auth.user._id && (
          <button
            onClick={(e) => deleteComment(postId, _id)}
            type="button"
            className="delete-post-btn">
            <i className="fas fa-times" />{" "}
          </button>
        )}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
