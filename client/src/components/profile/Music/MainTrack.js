import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const MainTrack = ({ currentTrackIndex, music, auth, addTrackComment }) => {
  const [surfer, setSurfer] = useState(null);
  const [playingToggle, setPlayingToggle] = useState(false);
  const [comment, setComment] = useState({
    time: 0,
    text: ""
  });

  useEffect(() => {
    if (surfer) {
      surfer.destroy();
      setSurfer(null);
    }
    drawASurfer(currentTrackIndex);
  }, [currentTrackIndex]);

  useEffect(() => {
    displayComments(music.tracks[currentTrackIndex]);
  }, [music.tracks[currentTrackIndex].comments, currentTrackIndex]);

  const drawASurfer = index => {
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
    wavesurfer.load(music.tracks[index].url);

    setSurfer(wavesurfer);
    //console.log("Kreirani wavesurfer", wavesurfer.backend.media);
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

  return (
    <div>
      <div className="track">
        <h4 className="my-1">{music.tracks[currentTrackIndex].title}</h4>
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
    </div>
  );
};

export default MainTrack;
