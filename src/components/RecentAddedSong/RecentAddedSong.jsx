import React, { useEffect, useState } from 'react';
import AudioControls from '../AudioControl/AudioControl';
import '../Footer/Footer.css';
import { Link } from 'react-router-dom';
import './RecentAddedSong.css'

function RecentAddedSong() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songsData, setSongsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('http://192.168.1.12:5000/api/addedsong');
      const data = await res.json();
      setSongsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (songsData) {
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

      return () => {
        audio.removeEventListener('timeupdate', updateCurrentTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [isPlaying, songsData]);

  const handlePlayPauseClick = (play) => {
    setIsPlaying(play);
  };

  const handleSeek = (seekTime) => {
    setCurrentTime(seekTime);
    const audio = document.getElementById('audio-element');
    audio.currentTime = seekTime;
  };

  return (
    <div className="footer-container mt-5 d-flex flex-column gap-4 justify-content-between align-items-center p-2 px-3">
      {isLoading ? (
        <p className='text-white'>Loading...</p>
      ) : songsData ? (
        <div className="song-info d-flex justify-content-between align-items-center gap-3">
          <img src={songsData.Img} alt={songsData.title} />
          <div className="song-name d-flex flex-column">
            <span className="name">{songsData.title}</span>
            <span className="artist">{songsData.Artists.join(', ')}</span>
          </div>
        </div>
      ) : (
        <p className='text-white'>No songs available.</p>
      )}
      {songsData && (
        <AudioControls
          isPlaying={isPlaying}
          onPlayPauseClick={handlePlayPauseClick}
          onPrevClick={() => {}}
          onNextClick={() => {}}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek} 
        />
      )}
      { songsData && (
        <audio id="audio-element" src={songsData.Src}></audio>
      )}
      <div className='d-flex justify-content-between w-100 px-5'>
        <button className='option-btn '>
          <Link to='/'>
              Home
          </Link>
        </button>
        <button className='option-btn'>
          <Link to='/addsong'>
              Add more song
          </Link>
        </button>
      </div>
    </div>
  );
}

export default RecentAddedSong;
