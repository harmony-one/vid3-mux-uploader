import React, {useCallback, useEffect, useState} from 'react';
import {VideoItem} from "./components/VideoItem";
import {VideoInfo} from "../video-upload/types";
import {client} from "../video-upload/client";
import {Box, Heading} from "grommet";
import {BaseLayout} from "../../components/BaseLayout";

interface Props {}

export const VideoListPage: React.FC<Props> = () => {

  const [videoList, setVideoList] = useState<VideoInfo[]>([]);

  const loadVideoList = useCallback(async () => {
    const list = await client.loadVideoList();

    setVideoList(() => list);
  }, []);

  useEffect(() => {
    loadVideoList();
  }, [loadVideoList])

  return (
    <BaseLayout>
      <Box pad="medium" gap="medium">
        <Heading>Uploaded video</Heading>
        {videoList.length > 0 &&
          <Box gap="medium">
            {videoList.map((item) => {
              return (
                <VideoItem video={item} />
              )
            })}
          </Box>
        }
      </Box>
    </BaseLayout>
  )
};

VideoListPage.displayName = 'VideoListPage';
