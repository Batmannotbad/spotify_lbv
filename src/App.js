import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Audioplayer from './components/Audioplayer/Audioplayer';
import { Signin } from './pages/Signin/Signin';
import { useSelector } from 'react-redux';
import { Signup } from './pages/Signup/Signup';
import FileUpload from './pages/Signup/FileUpload';
import { AddSong } from './components/AddSong/AddSong';
import RecentAddedSong from './components/RecentAddedSong/RecentAddedSong';
import  {Songlists}  from './components/Songlists/Songlists';
import Song from './components/Song/Song';
function App() {
  const isLoggedIn = Boolean (useSelector((state)=> state.user.isloggedIn));
  const currentSong = useSelector((state) => state.song.currentSong )
  console.log(isLoggedIn);
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element ={isLoggedIn? <Home/>:<Signin/>}/>
      {/* <Route path='/' element ={<Home/>}/> */}
      <Route path='/audio' element ={<RecentAddedSong/>}/>
      <Route path='/signin' element ={<Signin/>}/>
      <Route path='/signup' element ={<Signup/>}/>
      <Route path='/upload' element ={<FileUpload/>}/>
      <Route path='/addsong' element ={<AddSong/>}/>
      <Route path='/song' element ={<Songlists/>}/>
      <Route path="/song/:id" element={<Song/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
