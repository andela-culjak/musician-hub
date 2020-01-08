import React, { Fragment, useState, useEffect } from "react";
//import { peaks } from "peaks.js";
import WaveSurfer from "wavesurfer.js";

const AudioTracks = ({ profile }) => {
  const [surfer, setWavesurfer] = useState(null);
  const [playingToggle, setPlayingToggle] = useState(false);
  const [comment, setComment] = useState({
    time: 0,
    text: ""
  });

  useEffect(() => {
    //const aud = document.querySelector("#song");
    if (profile.tracks.length > 0) {
      const wavesurfer = WaveSurfer.create({
        barWidth: 2,
        barHeight: 1,
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

      setWavesurfer(wavesurfer);

      wavesurfer.load(profile.tracks[0]);
    }
  }, [setWavesurfer]);

  const playIt = () => {
    surfer.playPause();
    setPlayingToggle(!playingToggle);
  };

  const freezeCommentTime = () => {
    if (comment.time === 0) {
      setComment({
        ...comment,
        time: surfer.getCurrentTime()
      });
    }
  };

  const addCommentText = e => {
    setComment({
      ...comment,
      text: e.target.value
    });
  };

  return (
    <Fragment>
      {profile.tracks.length > 0 ? (
        <div className="audio-tracks">
          <h2>{profile.user.name.split(" ")[0]}'s Music</h2>
          <div className="main-track">
            <div id="waveform" />
            {/* <audio id="song" src="" /> */}
          </div>
          <div className="track-actions">
            <button className="play-btn" onClick={playIt}>
              {playingToggle ? (
                <i className="fas fa-pause"></i>
              ) : (
                <i className="fas fa-play"></i>
              )}
            </button>
            <button type="button" className="heart-button">
              <i className="far fa-heart" />{" "}
            </button>
            <input
              type="text"
              className="track-comment-input"
              onClick={freezeCommentTime}
              onChange={e => addCommentText(e)}
              placeholder="Add a comment"
            ></input>
          </div>
        </div>
      ) : (
        <div className="audio-tracks">
          <h3>This used has not added any music tracks yet.</h3>
        </div>
      )}
    </Fragment>
  );
};

export default AudioTracks;
