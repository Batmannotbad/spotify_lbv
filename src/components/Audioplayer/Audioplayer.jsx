import React, { useEffect, useState } from 'react';
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
      // setIsPlaying(true)
      console.log(isPlaying)
    } else {
      audio.pause();
      // setIsPlaying(false)
      console.log(isPlaying)
    }
    console.log(currentSong)
  };
  const handleNext = () => {
    if (currentSongIndex === songdata.length - 1) {
      setCurrentSongIndex(0);
      console.log(isPlaying);
    } else {
      setIsPlaying(false);
      setCurrentSongIndex(currentSongIndex + 1);
      console.log(isPlaying);
    }
    
  };
  // useEffect(() =>{
  //   if(isPlaying){
  //     setIsPlaying(false);
  //     setTimeout(()=>{
  //       setIsPlaying(true);
  //     },50)
  //   }
  // },[currentSongIndex])

  const handlePrev = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songdata.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

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
