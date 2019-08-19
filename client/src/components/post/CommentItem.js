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
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      {user._id ? (
        <Link to={`/profile/${user._id}`}>
          <img className="round-img" src={user.avatar} alt="" />
          <h4>{user.name}</h4>
        </Link>
      ) : (
        <h4>Deleted User</h4>
      )}
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>{" "}
      </p>

      {!auth.loading && user._id === auth.user._id && (
        <button
          onClick={e => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />{" "}
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
