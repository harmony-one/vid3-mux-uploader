import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MuxPlayer from "@mux/mux-player-react";
import MuxPlayerElement from "@mux/mux-player";
import { VideoInfo } from "../video-upload/types";
import { client } from "../video-upload/client";
import { BaseLayout } from "../../components/BaseLayout";
import { observer } from "mobx-react-lite";
import { metamaskStore } from "../../stores/stores";

const isVideoReady = (video: VideoInfo) => {
  return video.muxAssetStatus === "ready";
};

const getPlaybackId = (video: VideoInfo) => {
  return video.muxPlaybackId;
};

const VideoDetailsPage = observer(() => {
  const { vanityUrl } = useParams();
  const [video, setVideo] = useState<VideoInfo>();

  const loadVideo = useCallback(async () => {
    if (!vanityUrl || !metamaskStore.address) {
      return;
    }

    const responseData = await client.loadVideoByUrl(
      metamaskStore.address,
      vanityUrl
    );

    setVideo(() => responseData);
  }, [vanityUrl]);

  const ref = useRef<MuxPlayerElement>(null);

  useEffect(() => {
    loadVideo();
  }, [loadVideo]);

  const isVideoExistAndReady = video && isVideoReady(video);
  return (
    <BaseLayout>
      {!isVideoExistAndReady && <div>video preparing...</div>}
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
    </BaseLayout>
  );
});

export default VideoDetailsPage;
