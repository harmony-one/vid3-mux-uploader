import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { VideoItem } from "./components/VideoItem";
import { VideoInfo } from "../video-upload/types";
import { client } from "../video-upload/client";
import { Box, Heading } from "grommet";
import { BaseLayout } from "../../components/BaseLayout";
import { metamaskStore } from "../../stores/stores";

interface Props {}

export const VideoListPage: React.FC<Props> = observer(() => {
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);

  const loadVideoList = useCallback(async () => {
    if (!metamaskStore.address) {
      return;
    }

    const list = await client.loadVideoList(metamaskStore.address);

    setVideoList(() => list);
  }, []);

  useEffect(() => {
    loadVideoList();
  }, [loadVideoList]);

  return (
    <BaseLayout>
      <Box pad="medium" gap="medium">
        <Heading>My videos</Heading>
        {videoList.length > 0 && (
          <Box gap="medium">
            {videoList.map((item) => {
              return <VideoItem key={item.id} video={item} />;
            })}
          </Box>
        )}
      </Box>
    </BaseLayout>
  );
});

VideoListPage.displayName = "VideoListPage";
