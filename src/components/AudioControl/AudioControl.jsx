import React from "react";

const AudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick
}) => (
    <div className="player-control d-flex flex-column align-items-center">
        <div class="player-control-buttons d-flex gap-4 align-items-center">
            <button
                type="button"
                className="prev"
                aria-label="Previous"
                onClick ={onPrevClick}
                >
                    <i class="fa-solid fa-backward-step"></i>
                </button>
                {isPlaying? (
                    <button
                        className="pause"
                        onClick={() => onPlayPauseClick(false)}
                        aria-label="Pause"
                        >
                        <i class="fa-solid fa-circle-pause play-button"></i>
                        </button>
                ):(
                    <button
                        className="pause"
                        onClick={() => onPlayPauseClick(true)}
                        aria-label="Pause"
                        >
                        <i class="fa-solid fa-circle-play play-button"></i>
                        </button>
                )}
                <button
                type="button"
                className="prev"
                aria-label="Previous"
                onClick ={onNextClick}
                >
                    <i class="fa-solid fa-forward-step"></i>
                </button>

        </div>
    </div>
);
export default AudioControls