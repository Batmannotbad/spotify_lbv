import React, { useEffect, useState } from 'react';
import './mainview.css';
import { list } from '../../data';
import { mixlists } from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/userSlice';
import { clearSongData } from '../../features/songSlice';

function Mainview() {
  const user = useSelector(state => state.user.user);
  const [randomItems, setRandomItems] = useState([]);
  const [randomMixlists, setRandomMixlists] = useState([]);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearSongData());
    localStorage.removeItem('userInfo');
  };

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
    <div id="mainview" className="m-2">
      <div className="mainview-container">
        <header className="d-flex justify-content-between p-3">
          <div className="d-flex gap-3">
            <i className="fa-solid fa-chevron-left control-btn"></i>
            <i className="fa-solid fa-chevron-right control-btn"></i>
          </div>
          <div className="d-flex gap-3 align align-items-baseline me-2">
            <button className="install-btn d-flex align-items-center gap-2 p-2">
              <i className="fa-regular fa-circle-down fa-2xs pt-1"></i>
              <span> Install App</span>
            </button>
            <span>{user.fullname}</span>
            <div className="avatar-img" onClick={handleLogout}>
              <img src={user.img}className="avatar bg-info rounded-circle" alt="avt" />
            </div>
          </div>
        </header>
        <div className="mainview-content position-relative">
          <div className="recent-playlist m-2 ps-2">
            <h4 className="pb-4">Good morning</h4>
            <div className="list pb-4">
              {randomItems.map((item) => (
                <div className="card-container d-flex gap-3 align-items-center justify-content-between pe-3">
                  <div className="card-left d-flex gap-4 align-items-center">
                    <img src={item.image} alt={item.title} />
                    <span className="cardtitle">{item.title}</span>
                  </div>
                  <button className="play-btn">
                    <i className="fa-solid fa-circle-play fa-2xl"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="for-you-playlists my-3 ps-3 pe-4">
            {randomMixlists.map((item) => (
              <div className='pb-4'>
                <div className="d-flex justify-content-between pb-4 align-items-center playlist-tiles">
                  <h4>{item.mixListTile}</h4>
                  <span>Show all</span>
                </div>
                <div className="mix-list justify-content-between gap-3">
                  {item.content.map((contentItem) => (
                    <div className="playlist-card-holder">
                      <div className="playlist-card d-flex flex-column align-items-center p-4">
                        <div className="img-holder d-flex align-items-center pb-3">
                          <img src={contentItem.image} alt={contentItem.title} />
                        </div>
                        <div className="card-contents">
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
