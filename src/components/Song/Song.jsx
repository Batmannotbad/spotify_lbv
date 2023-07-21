import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Song.css'
import Audioplayer from '../Audioplayer/Audioplayer';

const Song = () => {
  const currentSong = useSelector((state) => state.song.currentSong);
  const { id } = useParams();

  if (currentSong._id !== id) {
    return <div>Error: Song not found!</div>;
  }

  return (
    <div>
    <div className='song-detail' style={{ backgroundImage:`url(${currentSong.Img})` }}></div>
    <div className='song-player'>
        <Audioplayer/>
    </div>
    </div>
  );
};

export default Song;
