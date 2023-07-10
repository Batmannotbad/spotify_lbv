import React, { useEffect, useState } from 'react';
import { songdata } from '../../data';
import AudioControls from '../AudioControl/AudioControl';
import "../Footer/Footer.css";

function Audioplayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = songdata[currentSongIndex];
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  const handlePlayPauseClick = (play) => {
    setIsPlaying(play);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex === songdata.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex === 0) {
        return songdata.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = document.getElementById('audio-element');

    const updateCurrentTime = () => {
      const timeInSeconds = audio.currentTime;
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      setCurrentTime(formattedTime);
    };

    const updateDuration = () => {
      const timeInSeconds = audio.duration;
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      setDuration(formattedTime);
    };

    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [isPlaying, currentSongIndex]);

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
