import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Song = () => {
  const currentSong = useSelector((state) => state.song.currentSong);
  const { id } = useParams();

  if (currentSong._id !== id) {
    return <div>Error: Song not found!</div>;
  }

  return (
    <div>
      <div className='text-white'>Song Details:</div>
      <div className='text-white'>Title: {currentSong.title}</div>
      <div className='text-white'>Artist: {currentSong.Artists}</div>
      <img className='song img' src={currentSong.Img} alt={currentSong.title}></img>
      <audio controls>
        <source src={currentSong.Src} type='audio/mpeg'></source>
      </audio>
    </div>
  );
};

export default Song;
