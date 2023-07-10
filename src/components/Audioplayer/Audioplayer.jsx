import React, { useState } from 'react';
import { songdata } from '../../data';
import AudioControls from '../AudioControl/AudioControl';
import "../Footer/Footer.css";

function Audioplayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = songdata[currentSongIndex];

  const handlePlayPauseClick = (play) => {
    setIsPlaying(play);
    const audio = document.getElementById('audio-element');
    if (play) {
      audio.play();
    } else {
      audio.pause();
    }
    console.log(currentSong)
  };

  const handleNext = () => {
    if (currentSongIndex === songdata.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songdata.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  return (
    <div class="footer-container d-flex justify-content-between align-items-center p-2 px-3">
      <div className="song-info d-flex justify-content-between align-items-center gap-3">
        <img src={currentSong.image} alt={currentSong.title} />
        <div className="song-name d-flex flex-column">
          <span className="name">{currentSong.title}</span>
          <span className="artist">{currentSong.artist}</span>
        </div>
        <i className="fa-regular fa-heart"></i>
        <i className="fa-solid fa-clone"></i>
      </div>
      <AudioControls
        isPlaying={isPlaying}
        onPlayPauseClick={handlePlayPauseClick}
        onPrevClick={handlePrev}
        onNextClick={handleNext}
      />
      <audio id="audio-element" src={currentSong.url}></audio>
      <div class="option-bar d-flex align-items-center justify-content-between gap-3 me-2">
                    <i class="fa-solid fa-microphone"></i>
                    <i class="fa-solid fa-bars"></i>
                    <i class="fa-solid fa-laptop-file"></i>
                    <i class="fa-solid fa-volume-low"></i>
                    <div class="volume-level">
                        <div class="recent-volume"></div>
                    </div>
                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                </div>

    </div>
  );
}

export default Audioplayer;
