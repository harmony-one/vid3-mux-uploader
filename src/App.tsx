import React from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';
import VideoHome from './routes/video-home';
import VideoReels from './routes/video-reels';
import VideoUploadPage from "./routes/video-upload/VideoUploadPage";
import VideoUploadListPage from "./routes/video-upload-list/VideoUploadListPage";
import {Providers} from "./Providers";
import {VideoListPage} from "./routes/video-list/VideoListPage";

function App() {
  return (
    <Providers>
      <div className="App">
        <Routes>
          <Route path='/videos' element={<VideoHome />} />
          <Route path="/videos/list" element={<VideoListPage />} />
          <Route path='/videos/upload' element={<VideoUploadPage />} />
          <Route path='/videos/upload/:videoId' element={<VideoUploadListPage />} />
          <Route path='/videos/:vanityUrl' element={<VideoReels />}/>
        </Routes>
      </div>
    </Providers>
  );
}

export default App;
