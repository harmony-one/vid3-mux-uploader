import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'

import { getOwnerVideos, VideoType } from '../../api/video-api';

import './video-home.scss';

const VideoHome = () => {
  const [videos, setVideos] = useState<VideoType[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const videos = getOwnerVideos('test');
    setVideos(videos)
  }, [])

  const watchVideo = (vanityUrl: string) => {
    navigate(`/videos/${vanityUrl}`)
  }
  
  return (
    <div className='video-home'>
      <h1>My Videos</h1>
      <div className='video-grid'>
        {videos.length > 1 && videos.map((video, index) =>
          <video key={index} onClick={() => watchVideo(video.vanityUrl)}>
            <source
              type='video/mp4'
              src={video.url}
            />
          </video>
        )}
      </div>
    </div>
  )
}

export default VideoHome;

// onClick={() => watchVideo(video.vanityUrl)}