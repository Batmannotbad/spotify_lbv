import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDownloadURL,uploadBytesResumable,ref } from 'firebase/storage';
import { storage } from '../../config/firebase';
export const Signup = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [fullname,setfullname] = useState('');
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [img, setimg] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://192.168.1.12:5000/api/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, fullname,img})
          });
          
          const data = await response.json();
    
          if (response.ok) {
            setMessage(data.message);
            navigate("/signin")
          } else {
            setMessage(data.message);
          }
          
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const onFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const handleUploadImage = async () => {
        if (!file) return;
    
        try {
          setIsLoading(true);
          const storageRef = ref(storage, `/user_image/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progress);
            },
            (err) => {
              console.log(err);
              setIsLoading(false);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((img) => {
                  setimg(img);
                  setIsLoading(false);
                  console.log('Image URL:', img);
                })
                .catch((error) => {
                  console.error('Error getting download URL:', error);
                  setIsLoading(false);
                });
            }
          );
        } catch (error) {
          console.error('Error uploading image:', error);
          setIsLoading(false);
        }
      };
  return (
    <div className='d-flex align-items-center login justify-content-center'>
    <div className=' container-login px-3 mt-3'>
        <div className='signin-option d-flex flex-column gap-4'>
            <h1 className='page-title text-center'>Sign up for free to start listening</h1>
            <div className='media-options d-flex flex-column gap-3 pb-4'>
                <button className='d-flex gap-3 align-items-center p-3 media-btn ps-4'>
                <img src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png" alt="Colorful Google Logo transparent clipart download @transparentpng.com"/>
                <span>Continue With Google</span>
                </button>
                <button className='d-flex gap-3 align-items-center p-3 media-btn ps-4'>
                <img src="https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png" alt="photo facebook logo png hd @transparentpng.com"/>
                <span>Continue With Facebook</span>
                </button>
            </div>
            <form className='signin-form d-flex flex-column gap-3 ' onSubmit={handleFormSubmit}>
                <div className='d-flex flex-column gap-1'>
                    <span className='input-title'>
                        Username
                    </span>
                    <input 
                        type='text'
                        placeholder='Username'
                        className='user-input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        >
                    </input>
                </div>
                <div className='d-flex flex-column gap-1'>
                    <span className='input-title'>
                        Email
                    </span>
                    <input 
                        type='text'
                        placeholder='Email'
                        className='user-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        >
                    </input>
                    
                </div>
                
                <div className='d-flex flex-column gap-1'>
                    <span className='input-title'>
                        Full name
                    </span>
                    <input 
                        type='text'
                        placeholder='Full Name'
                        className='user-input'
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                        >
                    </input>
                </div>
               
                <div className='d-flex flex-column gap-1'>
                    <span className='input-title'>
                        Password
                    </span>
                    <input
                        type='current-password'
                        placeholder='Password'
                        className='user-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                    </input>
                </div>

                <div className='d-flex flex-column gap-1'>
                    <span className='input-title'>
                        Confirm password
                    </span>
                    <input
                        type='current-password'
                        placeholder='Confirm Password'
                        className='user-input'
                        >
                    </input>
                </div>
                <div className='d-flex flex-column gap-1'>
                    <span className='input-title'>
                        Image url
                    </span>
                    <input
                        type='file'
                        placeholder='Image url'
                        className='user-input'
                        onChange={onFileChange}
                        >
                    </input>
                    <button type='button' className='submit-btn mt-2' onClick={handleUploadImage}>
                        Upload Image
                    </button>
                    {isLoading && <p>Uploading... {progress}%</p>}
                </div>
                <div className='d-flex justify-content-center'>
                    <button type='submit' className='submit-btn mt-2'>Sign up</button>
                </div>
            </form>
            <div className='d-flex flex-column align-items-center other-options gap-2'>

                <span>Already had an account?
                <a href='/signin'>Login now</a>
                </span>
            </div>
        </div>
        </div>
    </div>
  )
}
