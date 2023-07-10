import React from 'react';
import "./Footer.css";
import Audioplayer from '../Audioplayer/Audioplayer';

function Footer() {
  return (
    <div id="now-playing " class="fixed-bottom">
                {/* <div class="song-info d-flex justify-content-between align-items-center gap-3">
                    <img src="./assets/img/artist.jpg"/>
                    <div class="song-name d-flex flex-column">
                        <span class="name">enough for you</span>
                        <span class="artist">Thorne</span>
                    </div>
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-clone"></i>
                </div>
                <div class="player-control d-flex flex-column align-items-center">
                    <div class="player-control-buttons d-flex gap-4 align-items-center">
                        <i class="fa-solid fa-shuffle"></i>
                        <i class="fa-solid fa-backward-step"></i>
                        <i class="fa-solid fa-circle-play play-button"></i>
                        <i class="fa-solid fa-forward-step"></i>
                        <i class="fa-solid fa-repeat"></i>
                    </div>
                    <div class="playback-bar d-flex align-items-center justify-content-between gap-3">
                        <span>2:30</span>
                        <div class="overall">
                            <div class="play-progress"></div>
                        </div>
                        <span>3:57</span>
                    </div>
                </div>
                <div class="option-bar d-flex align-items-center justify-content-between gap-3 me-2">
                    <i class="fa-solid fa-microphone"></i>
                    <i class="fa-solid fa-bars"></i>
                    <i class="fa-solid fa-laptop-file"></i>
                    <i class="fa-solid fa-volume-low"></i>
                    <div class="volume-level">
                        <div class="recent-volume"></div>
                    </div>
                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                </div> */}
            <Audioplayer/>
        </div>
  )
}

export default Footer