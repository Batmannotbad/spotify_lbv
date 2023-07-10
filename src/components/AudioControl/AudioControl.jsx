import React from "react";

const AudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick
}) => (
    <div className="player-control d-flex flex-column align-items-center">
        <div className="player-control-buttons d-flex gap-4 align-items-center">
            <button
                type="button"
                className="prev"
                aria-label="Previous"
                onClick ={onPrevClick}
                >
                    <i className="fa-solid fa-backward-step"></i>
                </button>
                {isPlaying? (
                    <button
                        className="pause"
                        onClick={() => onPlayPauseClick(false)}
                        aria-label="Pause"
                        >
                        <i className="fa-solid fa-circle-pause play-button"></i>
                        </button>
                ):(
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
                className="prev"
                aria-label="Previous"
                onClick ={onNextClick}
                >
                    <i className="fa-solid fa-forward-step"></i>
                </button>

        </div>
    </div>
);
export default AudioControls