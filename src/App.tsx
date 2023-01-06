import React from 'react';
import { Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import VideoHome from './routes/video-home';
import VideoReels from './routes/video-reels';
import VideoUploadPage from "./routes/video-upload/VideoUploadPage";
import VideoUploadListPage from "./routes/video-upload-list/VideoUploadListPage";
import {Providers} from "./Providers";

function App() {
  return (
    <Providers>
      <div className="App">
        <Routes>
          <Route path='/videos' element={<VideoHome />} />
          <Route path='/videos/upload' element={<VideoUploadPage />} />
          <Route path='/videos/upload/:videoId' element={<VideoUploadListPage />} />
          <Route path='/videos/:vanityUrl' element={<VideoReels />}/>
        </Routes>
      </div>
    </Providers>
  );
}

export default App;
