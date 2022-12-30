import React from 'react';
import { Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import VideoHome from './routes/video-home';
import VideoReels from './routes/video-reels';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/videos' element={<VideoHome />} />
        <Route path='/videos/:vanityUrl' element={<VideoReels />}/>
      </Routes>
    </div>
  );
}

export default App;
