import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, user, likes, comments, date },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      {user._id ? (
        <Link to={`/profile/user/${user._id}`}>
          <img className="round-img" src={user.avatar} alt="" />
          <h4>{user.name}</h4>
        </Link>
      ) : (
        <h4> Deleted user </h4>
      )}
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        <Moment format="YYYY/MM/DD">{date}</Moment>{" "}
      </p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{" "}
            {likes.length > 0 && <span> {likes.length}</span>}
          </button>

          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>

          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count"> {comments.length}</span>
            )}
          </Link>
          {!auth.loading && user._id === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn delete-post-btn"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
