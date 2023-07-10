import React, { useEffect, useState } from 'react';
import './mainview.css';
import { list } from '../../data';
import { mixlists } from '../../data';

function Mainview() {
  const [randomItems, setRandomItems] = useState([]);
  const [randomMixlists, setRandomMixlists] = useState([]);

  useEffect(() => {
    generateRandomItems();
    generateMixlists();
  }, []);

  const generateRandomItems = () => {
    const selectedItems = [];
    while (selectedItems.length < 6) {
      const randomIndex = Math.floor(Math.random() * list.length);
      const selectedItem = list[randomIndex];
      if (!selectedItems.includes(selectedItem)) {
        selectedItems.push(selectedItem);
      }
    }
    setRandomItems(selectedItems);
  };

  const generateMixlists = () => {
    const generatedMixlists = mixlists.map((item) => {
      const selectedContents = [];
      while (selectedContents.length < 6) {
        const randomIndex = Math.floor(Math.random() * item.content.length);
        const selectedContent = item.content[randomIndex];
        if (!selectedContents.includes(selectedContent)) {
          // Randomly pick 2 artists for the selected content item
          const selectedArtists = [];
          while (selectedArtists.length < 2) {
            const randomArtistIndex = Math.floor(Math.random() * selectedContent.artists.length);
            const selectedArtist = selectedContent.artists[randomArtistIndex];
            if (!selectedArtists.includes(selectedArtist)) {
              selectedArtists.push(selectedArtist);
            }
          }
          selectedContent.artists = selectedArtists;
  
          selectedContents.push(selectedContent);
        }
      }
      return {
        ...item,
        content: selectedContents,
      };
    });
  
    setRandomMixlists(generatedMixlists);
  };
  
  

  return (
    <div id="mainview" class="m-2">
      <div class="mainview-container">
        <header class="d-flex justify-content-between p-3">
          <div class="d-flex gap-3">
            <i class="fa-solid fa-chevron-left control-btn"></i>
            <i class="fa-solid fa-chevron-right control-btn"></i>
          </div>
          <div class="d-flex gap-3 align align-items-baseline me-2">
            <button class="install-btn d-flex align-items-center gap-2 p-2">
              <i class="fa-regular fa-circle-down fa-2xs pt-1"></i>
              <span>Install App</span>
            </button>
            <div class="avatar-img">
              <img src="./assets/img/avatar.jpg" class="avatar bg-info rounded-circle" alt="avt" />
            </div>
          </div>
        </header>
        <div class="mainview-content position-relative">
          <div class="recent-playlist m-2 ps-2">
            <h4 class="pb-4">Good morning</h4>
            <div class="list pb-4">
              {randomItems.map((item) => (
                <div class="card-container d-flex gap-3 align-items-center justify-content-between pe-3">
                  <div class="card-left d-flex gap-4 align-items-center">
                    <img src={item.image} alt={item.title} />
                    <span class="cardtitle">{item.title}</span>
                  </div>
                  <button class="play-btn">
                    <i class="fa-solid fa-circle-play fa-2xl"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div class="for-you-playlists my-3 ps-3 pe-4">
            {randomMixlists.map((item) => (
              <div className='pb-4'>
                <div class="d-flex justify-content-between pb-4 align-items-center playlist-tiles">
                  <h4>{item.mixListTile}</h4>
                  <span>Show all</span>
                </div>
                <div class="mix-list justify-content-between gap-3">
                  {item.content.map((contentItem) => (
                    <div class="playlist-card-holder">
                      <div class="playlist-card d-flex flex-column align-items-center p-4">
                        <div class="img-holder d-flex align-items-center pb-3">
                          <img src={contentItem.image} alt={contentItem.title} />
                        </div>
                        <div class="card-contents">
                          <h5>{contentItem.title}</h5>
                          <span>{contentItem.artists.join(", ")+" and others"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainview;
