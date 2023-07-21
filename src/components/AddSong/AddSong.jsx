import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase';
import './AddSong.css'

export const AddSong = () => {
    const [title, setTitle] = useState('');
    const [Artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const [songCover, setSongCover] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (!title || Artists.length === 0 || !audioFile || !songCover) {
        setMessage('Please fill in all fields.');
        return;
      }
  
      try {
        setIsLoading(true);
  
        // Upload audio file and song cover to Firebase Storage
        const [Src, Img] = await Promise.all([
          uploadFileAndGetURL(audioFile, '/audio_files'),
          uploadFileAndGetURL(songCover, '/song_covers')
        ]);
  
        if (Src && Img) {
          const response = await fetch('http://192.168.1.12:5000/api/addsongs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, Artists, Src, Img }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            setMessage(data.message);
            navigate('/audio');
          } else {
            setMessage(data.message);
          }
        } else {
          setMessage('Error uploading files. Please try again.');
        }
  
        setIsLoading(false);
        setProgress(0); // Reset progress
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
        setProgress(0); // Reset progress in case of an error
      }
    };
  
    const onAudioFileChange = (e) => {
      setAudioFile(e.target.files[0]);
    };
  
    const onSongCoverChange = (e) => {
      setSongCover(e.target.files[0]);
    };
  
    const handleArtistChange = (e) => {
      const ArtistsArray = e.target.value.split(',').map((artist) => artist.trim());
      setArtists(ArtistsArray);
    };
  
    const uploadFileAndGetURL = async (file, path) => {
      if (!file) return null;
  
      const storageRef = ref(storage, `${path}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      });
  
      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.error('Error uploading file:', error);
        return null;
      }
    };
  return (
    <div className='d-flex align-items-center justify-content-center add-song'>
    <div className='container p-5 form-content'>
        <h3 className='text-white text-weight'>Add song</h3>
        <form className='d-flex flex-column gap-3' onSubmit={handleFormSubmit}>
            <div className='d-flex gap-2 text-white text-weight flex-column'>
                <span>Add song title: </span>
                <input 
                    type='text'
                    placeholder='Song title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='song-input p-2 me-3' />
            </div>
                <div className='d-flex gap-2 text-white text-weight flex-column'>
                    <span>Artists (separate by commas): </span>
                    <input 
                        type='text'
                        value={Artists.join(', ')}
                        placeholder='Artists'
                        onChange={handleArtistChange}
                        className='song-input p-2 me-3' />
                    </div>
                <div className='d-flex gap-2 text-white text-weight flex-column'>
                <label htmlFor="audioFile">Add audio file</label>
                <input 
                    type='file'
                    accept='.mp3'
                    id='audioFile'
                    onChange={onAudioFileChange} />
                </div>
                
                <div className='d-flex gap-2 text-white text-weight flex-column'>
                <label htmlFor="coverPhoto">Add cover image</label>
                <input 
                    type='file'
                    id='coverPhoto'
                    placeholder='Cover photo'
                    onChange={onSongCoverChange} />
                </div>
                {isLoading && <p className='text-white'>Uploading... {progress}%</p>}
                <div className='d-flex justify-content-center'>
                <button type='submit' className='add-song-btn p-2 mt-3'>Upload</button>
                </div>
                {message && <p className='text-white'>{message}</p>}
      </form>
    </div>
    </div>
  );
};
