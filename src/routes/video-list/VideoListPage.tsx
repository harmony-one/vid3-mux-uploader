import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { VideoItem } from "./components/VideoItem";
import { VideoInfo } from "../video-upload/types";
import { client } from "../video-upload/client";
import { Box, Heading, Spinner } from "grommet";
import { BaseLayout } from "../../components/BaseLayout";
import { metamaskStore } from "../../stores/stores";
import { AnchorLink } from "../../components/AnchorLink";

interface Props {}

export const VideoListPage: React.FC<Props> = observer(() => {
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);

  const [loading, setLoading] = useState(false);

  const loadVideoList = useCallback(async () => {
    if (!metamaskStore.address) {
      return;
    }

    setLoading(true);

    try {
      const list = await client.loadVideoList(metamaskStore.address);
      setVideoList(() => list);
    } catch (ex) {}

    setLoading(false);
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
        {loading && (
          <Box align="center">
            <Spinner size="large" message="loading..." />
          </Box>
        )}
        {!loading && !videoList.length && (
          <Box>
            <AnchorLink to="/upload" label="Create first video" />
          </Box>
        )}
      </Box>
    </BaseLayout>
  );
});

VideoListPage.displayName = "VideoListPage";
