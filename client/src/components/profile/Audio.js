import React, { useState, useEffect }  from 'react';
import { peaks } from 'peaks.js';
import WaveSurfer from 'wavesurfer.js';

const AudioTracks = () => {

    const [surfer, setWavesurfer] = useState(null);
    const [playingToggle, setPlayingToggle] = useState(false);
    const [comment, setComment] = useState({
        time: 0,
        text: ""
    });
    

    useEffect(() => {
    const aud = document.querySelector('#song');

    const wavesurfer = WaveSurfer.create({
      barWidth: 2,
      barHeight: 1,
      barRadius: 3,
      cursorWidth: 2,
      container: '#waveform',
      backend: 'MediaElement',
      fillParent: true,
      progressColor: '#4a74a5',
      responsive: true,
      waveColor: '#ccc',
      cursorColor: 'rgba(255,255,255,0)',
      autoCenter: true,
      barGap: 2
    });

    setWavesurfer(wavesurfer);

    wavesurfer.load(aud, peaks);
    wavesurfer.load("/uploads/FosterThePeople.mp3");
  },[setWavesurfer]);

  const playIt = () => {
    surfer.playPause();
    setPlayingToggle(!playingToggle);
  };

  const freezeCommentTime = () => {
    if(comment.time === 0) {
        setComment({
            ...comment,
            time: surfer.getCurrentTime()
        })
    }
  };

  const addCommentText = (e) => {
    setComment({
        ...comment,
        text: e.target.value
    })
  }
 
    return (

    <div className="audio-tracks">
        <div className="main-track">
            <div id="waveform"/>
            <audio id="song" src=""/>
        </div>
        <div className="track-actions">
            <button className="play-btn" onClick={playIt}>
                {playingToggle ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
            </button>
            <button
                type="button"
                className="like-track-button">
                <i className="far fa-heart" />{" "}
            </button>
            <input 
                type="text" 
                className="track-comment-input" 
                onClick={freezeCommentTime} 
                onChange={e => addCommentText(e)} 
                placeholder="Add a comment">
            </input>
        </div>
        
    </div>
      
    );
};

export default AudioTracks;

