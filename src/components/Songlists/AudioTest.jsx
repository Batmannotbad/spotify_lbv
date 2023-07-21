import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AudioControls from '../AudioControl/AudioControl';
import { setCurrentSong } from '../../features/songSlice';



const AudioTest = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const allSongs = useSelector((state) => state.song.song);
  const currentSong = allSongs[currentSongIndex];
  const storedSong = useSelector((state) => state.song.currentSong);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(0.5);

  

  const findSongById = (allSongs, songId) => {
    const foundSong = allSongs.find((song) => song._id === songId);
    return foundSong || null;
  };
  

  useEffect(() => {
    const currentIndex = allSongs.findIndex((song) => song._id === storedSong._id);
    if (currentIndex !== -1) {
      setCurrentSongIndex(currentIndex);
    }
    const songFound = findSongById(allSongs, storedSong.id);
    setCurrentSong(songFound);
  }, [storedSong, allSongs]);
  


  const handlePlayPauseClick = (play) => {
    setIsPlaying(play);
};
  const handleNext = async () => {
      let nextIndex;
      if (currentSongIndex === allSongs.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = currentSongIndex + 1;
      }

      setIsPlaying(false); 
      await setCurrentSongIndex(nextIndex);
      const nextSong = allSongs[nextIndex];
      dispatch(setCurrentSong(nextSong)); 
      setIsPlaying(true); 
  };

  const handlePrev = async () => {
    let prevIndex;
    if (currentSongIndex === 0) {
      prevIndex = allSongs.length - 1;
    } else {
      prevIndex = currentSongIndex - 1;
    }

    setIsPlaying(false); 
    await setCurrentSongIndex(prevIndex); 
    const prevSong = allSongs[prevIndex];
    dispatch(setCurrentSong(prevSong)); 
    setIsPlaying(true); 
  };

  const handleSeek = (seekTime) => {
    setCurrentTime(seekTime);
    const audio = document.getElementById('audio-element');
    if (audio) {
      audio.currentTime = seekTime;
    }
  };
   useEffect(() => {
    const audio = document.getElementById('audio-element');

    if (audio) {
      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const updateDuration = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener('timeupdate', updateCurrentTime);
      audio.addEventListener('loadedmetadata', updateDuration);

      if (isPlaying) {
        console.log("currentSong: ", currentSong.title);
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
    }
  }, [isPlaying, currentSongIndex, allSongs]);
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    const audio = document.getElementById('audio-element');
    if (audio) {
      audio.volume = newVolume;
    }
  };


  return (
    <div className="footer-container d-flex justify-content-between align-items-center p-2 px-3">
      {currentSong && (
        <>
          <div className="song-info d-flex justify-content-between align-items-center gap-3">
            <img src={currentSong.Img} alt={currentSong.title} />
            <div className="song-name d-flex flex-column">
              <span className="name">{currentSong.title}</span>
              <span className="artist">{currentSong.Artists.join(', ')}</span>
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
          <audio id="audio-element" src={currentSong.Src}></audio>
          <div className="option-bar d-flex align-items-center justify-content-between gap-3 me-2">
            <i className="fa-solid fa-microphone"></i>
            <i className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-laptop-file"></i>
            <i className="fa-solid fa-volume-low"></i>
           
            <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
          </div>
        </>
      )}
    </div>
  );
}

export default AudioTest
