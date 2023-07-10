import React, { useEffect, useState } from 'react';
import { songdata } from '../../data';
import AudioControls from '../AudioControl/AudioControl';
import "../Footer/Footer.css";

function Audioplayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = songdata[currentSongIndex];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPauseClick = (play) => {
    setIsPlaying(play);
  };

  const handleNext = () => {
    if (currentSongIndex === songdata.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songdata.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
    setIsPlaying(true);
  };

  const handleSeek = (seekTime) => {
    setCurrentTime(seekTime);
    const audio = document.getElementById('audio-element');
    audio.currentTime = seekTime;
  };

  useEffect(() => {
    const audio = document.getElementById('audio-element');

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    if (audio.currentTime === audio.duration) {
      handleNext();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [isPlaying, currentSongIndex,currentSong]);

  return (
    <div className="footer-container d-flex justify-content-between align-items-center p-2 px-3">
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
        onPrevClick={handlePrev}
        onNextClick={handleNext}
        onPlayPauseClick={handlePlayPauseClick}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek} 
      />
      <audio id="audio-element" src={currentSong.url}></audio>
      <div className="option-bar d-flex align-items-center justify-content-between gap-3 me-2">
        <i className="fa-solid fa-microphone"></i>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-laptop-file"></i>
        <i className="fa-solid fa-volume-low"></i>
        <div className="volume-level">
          <div className="recent-volume"></div>
        </div>
        <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
      </div>
    </div>
  );
}

export default Audioplayer;
