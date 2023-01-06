import React from 'react';
import {VideoInfo} from "../../video-upload/types";
import {getVideoUrl} from "../../../router";
import {Anchor, Box, Image, Text} from "grommet";

interface Props {
  video: VideoInfo,
}

const getVideoPreviewUrl = (video: VideoInfo) => {
  if (!video) {
    return '';
  }

  return `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?width=628&fit_mode=pad&time=1.1511500000000001`
}

export const VideoItem: React.FC<Props> = ({video}) => {
  return <Box direction="row" gap="medium">
    <Box width="200px" height="200px">
      <Image src={getVideoPreviewUrl(video)} alt="preview" />
    </Box>
    <Box align="start">
      <Box direction="row" gap="medium">
        <Text weight="bold">Uploaded At:</Text>
        <Text>{new Date(video.createdAt).toLocaleDateString()}</Text>
      </Box>
      <Box direction="row" gap="medium">
        <Text weight="bold">Asset status:</Text>
        <Text>{video.muxAssetStatus}</Text>
      </Box>
      <Anchor href={getVideoUrl(video)}>Go to video</Anchor>
    </Box>
  </Box>;
};
