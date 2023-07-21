import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../../features/userSlice';
import './Signin.css'

export const Signin = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://192.168.1.12:5000/api/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
    
          const data = await response.json();
          console.log(data);
    
          if (response.ok) {
            setMessage(data.message);
            navigate("/");
            dispatch(login(data))

          } else {
            setMessage(data.message);
            console.log(message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
  return (
    <div className='d-flex align-items-center login justify-content-center'>
    <div className=' container-login px-3 mt-3'>
        <div className='signin-option d-flex flex-column gap-4'>
            <h1 className='page-title'>Log in to Spotify</h1>
            <div className='media-options d-flex flex-column gap-3 pb-4'>
                <button className='d-flex gap-3 align-items-center p-3 media-btn ps-4'>
                <img src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png" alt="logo"/>
                <span>Continue With Google</span>
                </button>
                <button className='d-flex gap-3 align-items-center p-3 media-btn ps-4'>
                <img src="https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png" alt="logo"/>
                <span>Continue With Facebook</span>
                </button>
                <button className='d-flex gap-3 align-items-center p-3 media-btn ps-4'>
                <img src="https://www.transparentpng.com/thumb/apple-logo/UyOL60-apple-logo-wonderful-picture-images.png" alt="logo"/>
                <span>Continue With Apple</span>
                </button>
                <button className='d-flex gap-3 align-items-center p-3 media-btn ps-4'>
                <span>Continue With Phone Number</span>
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
                        Password
                    </span>
                    <input
                        type='password'
                        placeholder='Password'
                        className='user-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                    </input>
                </div>
                {/* {message&& <p>{message}</p>} */}
                <div className='d-flex justify-content-center'>
                    <button type='submit' className='submit-btn mt-2'><Link to='/'></Link>Log in</button>
                </div>
            </form>
            <div className='d-flex flex-column align-items-center other-options gap-2'>
                <a href='/signin'>Forgot your password?</a>
                <span>Don't have an account?</span>
                <a href='/signup'>Sign up for Spotify</a>
            </div>
        </div>
        </div>
    </div>
  )
}
