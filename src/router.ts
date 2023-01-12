import {VideoInfo} from "./routes/video-upload/types";

export const getVideoUrl = (video: VideoInfo) => {
  if (!video) {
    return '';
  }

  return `/videos/${video.url}`;
}