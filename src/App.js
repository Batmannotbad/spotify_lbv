import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Audioplayer from './components/Audioplayer/Audioplayer';
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/audio' element ={<Audioplayer/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
