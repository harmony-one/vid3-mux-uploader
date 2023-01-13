import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useParams} from "react-router-dom";
import MuxPlayer from '@mux/mux-player-react';
import MuxPlayerElement from '@mux/mux-player';
import {VideoInfo} from "../video-upload/types";
import {client} from "../video-upload/client";
import {BaseLayout} from "../../components/BaseLayout";
import {Button} from "grommet";

const isVideoReady = (video: VideoInfo) => {
  return video.muxAsset.status === 'ready';
}

const getPlaybackId = (video: VideoInfo) => {
  if (!video.muxAsset.playback_ids) {
    return '';
  }

  return video.muxAsset.playback_ids[0].id;
}

const VideoDetailsPage = () => {

  const {vanityUrl} = useParams();
  const [video, setVideo] = useState<VideoInfo>();

  const loadVideo = useCallback(async () => {
    if (!vanityUrl) {
      return;
    }

    const responseData = await client.loadVideoBySequenceId(vanityUrl);

    setVideo(() => responseData);

  }, [vanityUrl]);

  const ref = useRef<MuxPlayerElement>(null);

  const handleVolumeUp = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const v = ref.current.volume;
    ref.current.volume = v + 0.1;
  }, [ref]);

  const handleVolumeDown = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const v = ref.current.volume;
    ref.current.volume = v - 0.1;
  }, [ref]);

  useEffect(() => {
    loadVideo()
  }, [loadVideo]);

  const isVideoExistAndReady = video && isVideoReady(video);
  return (
    <BaseLayout>
      {!isVideoExistAndReady && (
        <div>video preparing...</div>
      )}
      {isVideoExistAndReady && (
        <MuxPlayer
          ref={ref}
          streamType="on-demand"
          playbackId={getPlaybackId(video)}
          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
        />
      )}

      <Button label="volume up" onClick={handleVolumeUp} />
      <Button label="volume down" onClick={handleVolumeDown} />

    </BaseLayout>
  )
}

export default VideoDetailsPage