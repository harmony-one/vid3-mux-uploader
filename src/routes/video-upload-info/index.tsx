import React, { useCallback, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import MuxPlayer from '@mux/mux-player-react';


export interface VideoInfo {
  id: string,
  createdAt: string,
  muxAsset: {
    status: 'preparing' | 'ready' | 'errored',
    playback_ids?: [
      {
        id: string
      }
    ]
  }
}


const isVideoReady = (video: VideoInfo) => {
  return video.muxAsset.status === 'ready';
}

const getPlaybackId = (video: VideoInfo) => {
  if (!video.muxAsset.playback_ids) {
    return '';
  }

  return video.muxAsset.playback_ids[0].id;
}

const VideoUploadInfo = () => {

  const {videoId} = useParams();
  const [video, setVideo] = useState<VideoInfo>();

  const loadVideo = useCallback(async () => {
    const response = await fetch(`http://188.68.221.147:8080/videos/${videoId}`, {
      method: 'Get',
    });

    const responseData = await response.json();

    setVideo(() => responseData.data);

  }, [videoId]);

  useEffect(() => {
    loadVideo()
  }, [loadVideo]);

  return (
    <div>
      {!video || !isVideoReady(video) && (
        <div>video preparing...</div>
      )}
      {video && isVideoReady(video) && (
        <MuxPlayer
          streamType="on-demand"
          playbackId={getPlaybackId(video)}
          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
        />
      )}
    </div>
  )
}

export default VideoUploadInfo