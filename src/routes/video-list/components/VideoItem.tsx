import React from 'react';
import {Box, Image, Text} from "grommet";
import {VideoInfo} from "../../video-upload/types";
import {getVideoUrl} from "../../../router";
import {AnchorLink} from "../../../components/AnchorLink";

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
    <Box width="300px" height="169px">
      <Image fit="cover" src={getVideoPreviewUrl(video)} alt="preview" />
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
      <Box direction="row" gap="medium">
        <Text weight="bold">Sequence ID:</Text>
        <Text>{video.sequenceId || 'empty'}</Text>
      </Box>
      <AnchorLink to={getVideoUrl(video)}>Go to video</AnchorLink>
    </Box>
  </Box>;
};
