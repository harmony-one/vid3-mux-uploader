import React from 'react';
import {VideoInfo} from "./types";

interface Props {
  video: VideoInfo,
}

export const getVideoUrl = (video: VideoInfo) => {
  if (!video) {
    return '';
  }

  // @ts-ignore
  return `/videos/upload/${video.id}`;
}

const getVideoPreviewUrl = (video: VideoInfo) => {
  if (!video) {
    return '';
  }

  return `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?width=628&fit_mode=pad&time=1.1511500000000001`
}

export const VideoItem: React.FC<Props> = ({video}) => {
  return <div>
    <div>
      <img src={getVideoPreviewUrl(video)} alt="preview" />
    </div>
    <div>
      {new Date(video.createdAt).toString()}
    </div>
    <div>
      {video.muxAssetStatus}
    </div>
    <div>
      <a href={getVideoUrl(video)}>Go to video</a>
    </div>
  </div>;
};
