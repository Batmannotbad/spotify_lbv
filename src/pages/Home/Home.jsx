import React from 'react'
import "./Home.css";
import Sidebar from '../../components/Sidebar/Sidebar';
import Mainview from '../../components/Mainview/mainview';
import Footer from '../../components/Footer/Footer';
function Home() {
  return (
    <div className='main'>
        <Sidebar/>
        <Mainview/>
        <Footer/>
    </div>
  )
}

export default Home