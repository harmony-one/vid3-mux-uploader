import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import VideoUploadPage from "./routes/video-upload/VideoUploadPage";
import VideoDetailsPage from "./routes/video-upload-list/VideoDetailsPage";
import {Providers} from "./Providers";
import {VideoListPage} from "./routes/video-list/VideoListPage";

function App() {
  return (
    <Providers>
      <div className="App">
        <Routes>
          <Route path="/" element={<VideoListPage />} />
          <Route path="/videos" element={<VideoListPage />} />
          <Route path='/upload' element={<VideoUploadPage />} />
          <Route path='/upload/:vanityUrl' element={<VideoDetailsPage />} />
          <Route path='/videos/:vanityUrl' element={<VideoDetailsPage />}/>
          <Route path="*" element={<Navigate to="/upload" replace={true} />} />
        </Routes>
      </div>
    </Providers>
  );
}

export default App;
