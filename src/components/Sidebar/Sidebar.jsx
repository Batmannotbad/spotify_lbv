import React from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '../../features/songSlice';
import { getSong } from '../../features/songSlice';



function Sidebar() {
    const [songData, setSongData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchSongData = async () => {
        try {
        const res = await fetch('http://192.168.1.12:5000/api/allsongs');
        if (res.ok) {
            const data = await res.json();
            setSongData(data);
            dispatch(getSong(data));
        } else {
            console.error('Error fetching data:', res.status, res.statusText);
        }
        } catch (error) {
        console.error('Error:', error);
        }
        setIsLoading(false);
        };

    useEffect(() => {
        console.log("fetching...");
        fetchSongData();
    }, []);
    const handleSongClick = (song) => {
        dispatch(setCurrentSong(song));
      };
      
  return (
    <div id="sidebar">
            <nav id="sidebar" className="d-flex justify-content-between flex-column fixed-left flex-shrink-0 bg-black m-2">
                <div className="wrapper d-flex flex-column gap-2">
                    <div className="sidebar-option">
                        <ul className="mb-0 p-4">
                            <li className="position-relative pl-3 mb-2">
                            <div className="d-flex align-items-center gap-3">
                                <i className="fa-solid fa-house "></i>
                                <span>
                                    Home
                                </span>
                            </div>
                        </li>
                            <li>
                                <div className="d-flex align-items-center gap-3">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <span>
                                        Search
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar-option library">
                        <div>
                            <div className="d-flex justify-content-between p-2">
                                <div className="p-2">
                                    <a className="d-flex align-items-center gap-2" href="/song">
                                        <img src="./assets/img/libreria.svg" className="img-fluid library-logo" alt="books"/>
                                        <span>Your library</span>
                                    </a>
                                </div>
                                <div className="p-2 d-flex gap-2">
                                    <Link to='/addsong'>
                                    <button className="btn-trans"><i className="fa-solid fa-plus rounded p-2"></i></button></Link>
                                    <button className="btn-trans"><i className="fa-solid fa-grip rounded p-2"></i></button>
                                    <button  className="btn-trans"><i className="fa-solid fa-arrow-left-long rounded p-2"></i></button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between p-2">
                                <div id="tag" className="tag d-flex justify-content-between gap-3">
                                    <button className="tag-btn px-3 py-1">
                                        Playlist
                                    </button>
                                    <button className="tag-btn px-3">
                                        Artist
                                    </button>
                                </div>
                                <div className="tag d-flex justify-content-between gap-3">
                                    <button className="btn-trans">
                                        <i className="fa-solid fa-magnifying-glass rounded p-2"></i>
                                    </button>
                                    <button className="btn-trans d-flex align-items-center justify-content-between gap-2 recent">
                                        <span>Recents</span>
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>

                            </div>
                            <div className="d-flex justify-content-between m-2 tab-header pb-2">
                                <span>Title</span>
                                <span className='middle'>Date added</span>
                                <span>Played</span>
                            </div>
                        </div>
                        <div className="position-relative scroll-bar">
                        <div className="p-2 d-flex gap-2">
                            <img src="./assets/img/liked-song.png" className="liked-song " alt='liked song'/>
                            <div className="">
                                <span className="title">Liked songs</span>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-thumbtack fa-xs" style={{color: "#37e154",}}></i>
                                    <span className="content">Playlist</span>
                                    <i className="fa-solid fa-circle fa-2xs"></i>
                                    <span className="content">{songData.length}</span>
                                </div>
                            </div>
                        </div>
                       
                        {isLoading ? (
                                    <p>Loading...</p>
                                ) : songData && songData.length > 0 ? (
                                    <div className="table-responsive">
                                    <table className="table table-hover">
                                        <tbody >
                                        {songData.map((song) => (
                                            <tr 
                                                key={song._id}
                                                className='content-card'
                                                onClick={() => {
                                                    handleSongClick(song);
                                                }}>
                                            <td className='d-flex gap-2 content-card'>
                                                <img src={song.Img} alt={song.title} className="liked-song" />
                                            <div className='d-flex flex-column'>
                                                <span className='title'>{song.title}</span>
                                                <span className='content text-wrap'>{song.Artists.join(', ')}</span>
                                            </div>  
                                            </td> 
                                            <td className='text-start'>
                                                <span className='content side-info'>3 Jul 2022</span>
                                            </td> 
                                            <td className='text-end'>
                                                <span className='content side-info'>3 days ago</span>
                                            </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    </div>
                                ) : (
                                    <p>No songs available.</p>
                                )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
  )
}

export default Sidebar