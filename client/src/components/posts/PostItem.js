import React from "react";
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
  post: { _id, text, user, likes, comments, date, trackId, heading },
  showActions,
}) => {
  const likeOrUnlikePost = (_id, likes) => {
    likes.filter((like) => like.user === auth.user._id).length > 0
      ? removeLike(_id)
      : addLike(_id);
  };

  return (
    <div className="post">
      <div className="author">
        {user._id ? (
          <Link to={`/profile/user/${user._id}`}>
            <img className="round-img" src={user.avatar} alt="" />
            <h5>{user.name}</h5>
          </Link>
        ) : (
          <h5> Deleted user </h5>
        )}

        <p className="post-date">
          <Moment fromNow>{date}</Moment>
        </p>
      </div>

      <div className="content">
        <div>
          <div className="post-text speech-bubble px-1 py-05">
            <small className="post-heading">
              {heading && <strong className="mb-1"> {heading}</strong>}
            </small>
            <p className="medium-small">{text}</p>

            {!auth.loading && user._id === auth.user._id && (
              <button onClick={() => deletePost(_id)} className="delete-post-btn">
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>

        {showActions && (
          <div className="mt-05">
            <button
              type="button"
              className="action-button mr-1"
              onClick={() => auth.isAuthenticated && likeOrUnlikePost(_id, likes)}>
              <i
                className={
                  (auth.user &&
                    likes.filter((like) => like.user === auth.user._id).length) > 0
                    ? `fas fa-heart`
                    : `far fa-heart`
                }
              />
              {likes.length > 0 && <span> {likes.length}</span>}
            </button>

            {trackId ? (
              <Link to={`/posts/musical/${_id}`}>
                <button className="action-button mr-1">
                  {<i className="fas fa-headphones-alt" />}
                </button>
              </Link>
            ) : (
              <Link to={`/posts/${_id}`}>
                <button className="action-button mr-1">
                  {
                    <>
                      <i className="far fa-comment-alt" />
                      {comments.length > 0 && <span> {comments.length}</span>}
                    </>
                  }
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
