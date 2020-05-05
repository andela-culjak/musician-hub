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
  unlikeATrack
}) => {
  const [surfer, setSurfer] = useState(null);
  const [playingToggle, setPlayingToggle] = useState(false);
  const [comment, setComment] = useState({
    time: 0,
    text: ""
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [track, updateTrack] = useState(music.tracks[currentTrackIndex]);

  useEffect(() => {
    updateTrack(music.tracks[currentTrackIndex]);
  });

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
  }, [currentTrackIndex]);

  useEffect(() => {
    displayComments();
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
      progressColor: "#4a74a5",
      responsive: true,
      waveColor: "#ccc",
      cursorColor: "rgba(255,255,255,0)",
      autoCenter: true,
      barGap: 2
    });
    wavesurfer.load(track.url);

    setSurfer(wavesurfer);
    //console.log("Kreirani wavesurfer", wavesurfer.backend.media);
  };

  const displayComments = () => {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    if (track.comments.length > 0) {
      track.comments.map(comment => {
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
                  at ${formatTime(comment.time)} -
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
      time: surfer.getCurrentTime()
    });
  };

  const addCommentText = e => {
    setComment({
      ...comment,
      text: e.target.value
    });
  };

  const submitComment = e => {
    e.preventDefault();

    const form = document.getElementById("myForm");
    form.reset();
    setComment({ time: "", text: "" });
    addTrackComment(comment, music._id, track._id);
  };

  const likeOrUnlikeTrack = () => {
    if (track.likes.filter(like => like.user === auth.user._id).length > 0) {
      unlikeATrack(music._id, track._id);
    } else {
      console.log("is gonna be liked");
      likeATrack(music._id, track._id);
    }
  };

  return (
    <div>
      <div className="main-track">
        <h4 className="my-1">{track.title}</h4>

        <div id="waveform" />
        {/* <audio id="song" src="" /> */}
      </div>
      <div className="times">
        <div className="current-time bg-light">{formatTime(currentTime)}</div>
        <div className="total-time bg-light">{formatTime(track.duration)}</div>
      </div>
      <div id="timeline"></div>

      <div className="track-actions">
        <button className="play-btn" onClick={playIt}>
          {playingToggle ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
        <button
          type="button"
          className={
            (auth.user &&
              track.likes.filter(like => like.user === auth.user._id).length) > 0
              ? `heart-button liked`
              : `heart-button`
          }
          onClick={() => auth.isAuthenticated && likeOrUnlikeTrack()}>
          <i className="far fa-heart" />{" "}
          {track.likes.length > 0 && <span> {track.likes.length}</span>}
        </button>
        <form id="myForm" className="track-comment-form">
          <input
            type="text"
            className="track-comment-input"
            onClick={freezeCommentTime}
            onChange={e => addCommentText(e)}
            placeholder="Add a comment"
            required
            disabled={!auth.isAuthenticated}></input>

          <input
            className="invisible"
            type="submit"
            onClick={e => submitComment(e)}></input>
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
  auth: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addTrackComment, likeATrack, unlikeATrack })(
  MainTrack
);
