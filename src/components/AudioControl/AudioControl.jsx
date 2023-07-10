import React from "react";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  currentTime,
  duration,
  onSeek,
}) => {
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    onSeek(seekTime);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;}

  return (
    <div className="player-control d-flex flex-column align-items-center">
      <div className="player-control-buttons d-flex gap-4 align-items-center">
        <button
          type="button"
          className="prev"
          aria-label="Previous"
          onClick={onPrevClick}
        >
          <i className="fa-solid fa-backward-step"></i>
        </button>
        {isPlaying ? (
          <button
            className="pause"
            onClick={() => onPlayPauseClick(false)}
            aria-label="Pause"
          >
            <i className="fa-solid fa-circle-pause play-button"></i>
          </button>
        ) : (
          <button
            className="play"
            onClick={() => onPlayPauseClick(true)}
            aria-label="Play"
          >
            <i className="fa-solid fa-circle-play play-button"></i>
          </button>
        )}
        <button
          type="button"
          className="next"
          aria-label="Next"
          onClick={onNextClick}
        >
          <i className="fa-solid fa-forward-step"></i>
        </button>
      </div>
      <div className="playback-bar d-flex align-items-center justify-content-between gap-3">
        <span className="time" id="current-time">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          id="seek-slider"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          onMouseUp={handleSeek} // Added to seek audio on mouse release
        />
        <span className="time" id="duration">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default AudioControls;
