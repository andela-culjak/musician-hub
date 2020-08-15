import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import MainTrack from "../profile/Music/MainTrack";
import { getMusicById } from "../../actions/music";

const Post = ({ getPost, getMusicById, music, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  useEffect(() => {
    if (post && post.trackId) {
      getMusicById(post.user._id);
    }
  }, [post, getMusicById]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        {" "}
        Go back to posts
      </Link>
      <PostItem post={post} showActions={false} />

      {post && post.trackId && music && music.tracks.length ? (
        <MainTrack
          currentTrackIndex={music.tracks.findIndex((x) => x._id === post.trackId)}
          music={music}
          track={music.tracks.find((x) => x._id === post.trackId)}
        />
      ) : (
        <Fragment>
          <CommentForm postId={post._id} />
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  music: PropTypes.object,
};

const mapStateToProps = (state) => ({
  post: state.post,
  music: state.music.music,
});

export default connect(mapStateToProps, { getPost, getMusicById })(Post);
