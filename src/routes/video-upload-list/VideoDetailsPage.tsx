import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MuxPlayer from "@mux/mux-player-react";
import MuxPlayerElement from "@mux/mux-player";
import { Box, Button, Spinner, Text } from "grommet";
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

  const handleRefresh = useCallback(() => {
    loadVideo();
  }, []);

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
  const isVideoPreparing = video && video.muxAssetStatus === "preparing";
  return (
    <BaseLayout>
      <Box gap="medium" pad="medium">
        {!isVideoExistAndReady && (
          <Box align="center">
            <Spinner size="large" message="loading..." />
          </Box>
        )}
        {isVideoPreparing && (
          <Box align="center" gap="medium">
            <Text>Transcoding...</Text>
            <Button primary onClick={handleRefresh} label="Refresh Page" />
          </Box>
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
      </Box>
    </BaseLayout>
  );
});

export default VideoDetailsPage;
