import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//import { peaks } from "peaks.js";
import WaveSurfer from "wavesurfer.js";
import { connect } from "react-redux";
import { addTrackComment } from "../../actions/music";

const AudioTracks = ({ music, stateMusic, auth, addTrackComment }) => {
  const [surfer, setWavesurfer] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState("");
  const [playingToggle, setPlayingToggle] = useState(false);
  const [comment, setComment] = useState({
    time: 0,
    text: ""
  });

  useEffect(() => {
    if (surfer) {
      surfer.destroy();
      setWavesurfer(null);
    }

    const randomSongIndex = Math.floor(Math.random() * music.tracks.length);
    drawASurfer(randomSongIndex);
    setCurrentTrackIndex(randomSongIndex);
    displayComments(music.tracks[randomSongIndex]);
  }, []);

  useEffect(() => {
    if (music.tracks.length > 0 && currentTrackIndex)
      displayComments(music.tracks[currentTrackIndex]);
  }, [music]);

  const drawASurfer = index => {
    // const aud = document.querySelector("#song");
    const wavesurfer = WaveSurfer.create({
      barWidth: 1.5,
      barHeight: 1.5,
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

    // wavesurfer.load(aud, peaks);
    wavesurfer.load(music.tracks[index].url);

    setWavesurfer(wavesurfer);
    //console.log("Kreirani wavesurfer", wavesurfer.backend.media);
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
    setComment({ time: "", text: "" });
    const form = document.getElementById("myForm");
    form.reset();
    addTrackComment(comment, music._id, music.tracks[currentTrackIndex]._id);
  };

  const displayComments = track => {
    const timeline = document.getElementById("timeline");
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
              <span>${comment.user.name}</span>
              ${comment.text}
            </div>`);
      });
    }
  };

  return (
    <div className="audio-tracks">
      <h2>{music.user.name.split(" ")[0]}'s Music</h2>
      <div className="main-track">
        <div id="waveform" />
        {/* <audio id="song" src="" /> */}
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
          className="heart-button"
          // onClick={() => LikeTrack(_id)}
        >
          <i className="far fa-heart" />{" "}
          {/* {likes.length > 0 && <span> {likes.length}</span>} */}
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
      {/* <div className="playlist">
              
          </div> */}
    </div>
  );
};

AudioTracks.propTypes = {
  addTrackComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stateMusic: state.music.music,
  auth: state.auth
});

export default connect(mapStateToProps, { addTrackComment })(AudioTracks);
