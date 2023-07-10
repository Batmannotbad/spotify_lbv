import React from 'react';
import "./Sidebar.css";
import { data } from '../../data';

function Sidebar() {
   
  return (
    <div id="sidebar">
            <nav id="sidebar" class="d-flex justify-content-between flex-column fixed-left flex-shrink-0 bg-black m-2">
                <div class="wrapper d-flex flex-column gap-2">
                    <div class="sidebar-option">
                        <ul class="mb-0 p-4">
                            <li class="position-relative pl-3 mb-2">
                            <div class="d-flex align-items-center gap-3">
                                <i class="fa-solid fa-house "></i>
                                <span>
                                    Home
                                </span>
                            </div>
                        </li>
                            <li>
                                <div class="d-flex align-items-center gap-3">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    <span>
                                        Search
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="sidebar-option library">
                        <div>
                            <div class="d-flex justify-content-between p-2">
                                <div class="p-2">
                                    <a class="d-flex align-items-center gap-2" href="#">
                                        <img src="./assets/img/libreria.svg" class="img-fluid library-logo" alt="Icon depicting three vertical books"/>
                                        <span>Your library</span>
                                    </a>
                                </div>
                                <div class="p-2 d-flex gap-2">
                                    <button class="btn-trans"><i class="fa-solid fa-plus rounded p-2"></i></button>
                                    <button class="btn-trans"><i class="fa-solid fa-grip rounded p-2"></i></button>
                                    <button  class="btn-trans"><i class="fa-solid fa-arrow-left-long rounded p-2"></i></button>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between p-2">
                                <div id="tag" class="tag d-flex justify-content-between gap-3">
                                    <button class="tag-btn px-3 py-1">
                                        Playlist
                                    </button>
                                    <button class="tag-btn px-3">
                                        Artist
                                    </button>
                                </div>
                                <div class="tag d-flex justify-content-between gap-3">
                                    <button class="btn-trans">
                                        <i class="fa-solid fa-magnifying-glass rounded p-2"></i>
                                    </button>
                                    <button class="btn-trans d-flex align-items-center justify-content-between gap-2 recent">
                                        <span>Recents</span>
                                        <i class="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>

                            </div>
                            <div class="d-flex justify-content-between m-2 tab-header pb-2">
                                <span>Title</span>
                                <span>Date added</span>
                                <span>Played</span>
                            </div>
                        </div>
                        <div class="position-relative scroll-bar">
                        <div class="p-2 d-flex gap-2">
                            <img src="./assets/img/liked-song.png" class="liked-song "/>
                            <div class="">
                                <span class="title">Liked songs</span>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="fa-solid fa-thumbtack fa-xs" style={{color: "#37e154",}}></i>
                                    <span class="content">Playlist</span>
                                    <i class="fa-solid fa-circle fa-2xs"></i>
                                    <span class="content">57 songs</span>
                                </div>
                            </div>
                        </div>
                        {data.map(item => (
                        <div key={item.id}class="p-2 d-flex justify-content-between">
                            <div class="d-flex gap-2 content-card">
                                <img src={item.image} class="liked-song" alt={item.title}/>
                                <div class="">
                                    <span class="title">{item.title}</span>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="content">{item.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span class="content pe-4">{item.dateAdded}</span>
                            </div>
                            <div>
                                <span class="content last-played">{item.lastPlayed}</span>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
  )
}

export default Sidebar