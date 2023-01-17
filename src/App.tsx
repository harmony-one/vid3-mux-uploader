import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import VideoUploadPage from "./routes/video-upload/VideoUploadPage";
import VideoDetailsPage from "./routes/video-upload-list/VideoDetailsPage";
import { Providers } from "./Providers";
import { VideoListPage } from "./routes/video-list/VideoListPage";
import { RouteAuthRequired } from "./components/RouteAuthRequired";

function App() {
  return (
    <Providers>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <RouteAuthRequired>
                <VideoListPage />
              </RouteAuthRequired>
            }
          />
          <Route
            path="/videos"
            element={
              <RouteAuthRequired>
                <VideoListPage />
              </RouteAuthRequired>
            }
          />
          <Route
            path="/upload"
            element={
              <RouteAuthRequired>
                <VideoUploadPage />
              </RouteAuthRequired>
            }
          />
          <Route path="/upload/:vanityUrl" element={<VideoDetailsPage />} />
          <Route path="/videos/:vanityUrl" element={<VideoDetailsPage />} />
          <Route path="*" element={<Navigate to="/upload" replace={true} />} />
        </Routes>
      </div>
    </Providers>
  );
}

export default App;
