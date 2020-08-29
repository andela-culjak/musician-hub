import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrackComment, likeATrack, unlikeATrack } from "../../../actions/music";
import WaveSurfer from "wavesurfer.js";
import { formatTime } from "./Track";

const MainTrack = ({
  currentTrackIndex,
  music,
  auth,
  addTrackComment,
  likeATrack,
  unlikeATrack,
  track,
}) => {
  const [surfer, setSurfer] = useState(null);
  const [playingToggle, setPlayingToggle] = useState(false);
  const [comment, setComment] = useState({
    time: 0,
    text: "",
  });
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (surfer) {
      surfer.on("audioprocess", () =>
        setCurrentTime(Math.round(surfer.getCurrentTime()))
      );
    }
  });

  useEffect(() => {
    if (surfer) {
      surfer.destroy();
      setSurfer(null);
    }
    setPlayingToggle(false);
    drawASurfer();
    // eslint-disable-next-line
  }, [currentTrackIndex]);

  useEffect(() => {
    displayComments();
    // eslint-disable-next-line
  }, [track.comments, currentTrackIndex]);

  const drawASurfer = () => {
    const wavesurfer = WaveSurfer.create({
      barWidth: 1.8,
      barHeight: 1.2,
      barRadius: 3,
      cursorWidth: 2,
      container: "#waveform",
      backend: "MediaElement",
      fillParent: true,
      progressColor: "#2b587c",
      responsive: true,
      waveColor: "#fff",
      cursorColor: "rgba(255,255,255,0)",
      autoCenter: true,
      barGap: 2,
    });
    wavesurfer.load(track.url);

    setSurfer(wavesurfer);
    //console.log("Kreirani wavesurfer", wavesurfer.backend.media);
  };

  const displayComments = () => {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    if (track.comments.length > 0) {
      track.comments.map((comment) => {
        const percentage = (comment.time / track.duration) * 100;
        let side = percentage > 50 ? "right" : "left";
        const position =
          side === "left"
            ? `calc(${percentage}% - 10px)`
            : `calc(${100 - percentage}% - 10px)`;

        return (timeline.innerHTML += `<div 
                  class="user-head" 
                  style="left: calc(${(comment.time / track.duration) * 100}% - 10px); 
                    background-image: url(${comment.user.avatar}); "> 
                </div> 
    
                <div class="track-comment-text" style="${side}: ${position}; "> 
                  <span class="user">${comment.user.name}</span>
                  <span class="user"> ${formatTime(comment.time)} - </span>
                  ${comment.text}
                </div>`);
      });
    }
  };

  const playIt = () => {
    surfer.playPause();
    surfer.isPlaying() ? setPlayingToggle(true) : setPlayingToggle(false);
  };

  const freezeCommentTime = () => {
    setComment({
      ...comment,
      time: surfer.getCurrentTime(),
    });
  };

  const addCommentText = (e) => {
    setComment({
      ...comment,
      text: e.target.value,
    });
  };

  const submitComment = (e) => {
    e.preventDefault();

    const form = document.getElementById("myForm");
    form.reset();
    setComment({ time: "", text: "" });
    addTrackComment(comment, music._id, track._id);
  };

  const likeOrUnlikeTrack = () => {
    if (track.likes.filter((like) => like.user === auth.user._id).length > 0) {
      unlikeATrack(music._id, track._id);
    } else {
      likeATrack(music._id, track._id);
    }
  };

  return (
    <div>
      <div className="main-track">
        <div className="title-and-play">
          <button className="play-btn" onClick={playIt}>
            {playingToggle ? (
              <i className="fas fa-pause fa-2x mr-1"></i>
            ) : (
              <i className="fas fa-play fa-2x mr-1"></i>
            )}
          </button>
          <span className="my-1 medium-large">{track.title}</span>
        </div>

        <div id="waveform" />
        {/* <audio id="song" src="" /> */}
      </div>
      <div className="times">
        <div className="current-time bg-tr-dark">{formatTime(currentTime)}</div>
        <div className="total-time bg-tr-dark">{formatTime(track.duration)}</div>
      </div>
      <div id="timeline"></div>

      <div className="track-actions bg-tr-dark box-sh-dark">
        <button
          type="button"
          className="heart-button mx-05"
          onClick={() => auth.isAuthenticated && likeOrUnlikeTrack()}>
          <i
            className={
              (auth.user &&
                track.likes.filter((like) => like.user === auth.user._id).length) > 0
                ? `fa fa-heart fa-lg`
                : `far fa-heart fa-lg`
            }
          />
          {track.likes.length > 0 && <span> {track.likes.length}</span>}
        </button>
        <form id="myForm" className="track-comment-form">
          <input
            type="text"
            id="track-comment-input"
            className=" p-05"
            onClick={freezeCommentTime}
            onChange={(e) => addCommentText(e)}
            placeholder="Add a comment"
            required
            disabled={!auth.isAuthenticated}></input>

          <input
            className="invisible"
            type="submit"
            onClick={(e) => submitComment(e)}></input>
        </form>
      </div>
    </div>
  );
};

MainTrack.propTypes = {
  addTrackComment: PropTypes.func.isRequired,
  likeATrack: PropTypes.func.isRequired,
  unlikeATrack: PropTypes.func.isRequired,
  currentTrackIndex: PropTypes.number.isRequired,
  music: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addTrackComment, likeATrack, unlikeATrack })(
  MainTrack
);
