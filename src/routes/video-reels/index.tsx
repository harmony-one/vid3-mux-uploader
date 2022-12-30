import React, { useEffect, useState } from 'react'
import VideoPlayer from '../../components/video-player';

import { useParams } from 'react-router-dom'
import { getVideo, VideoType } from '../../api/video-api'

const VideoReels = () => {
  const [videos, setVideos] = useState<VideoType>()
  const { vanityUrl } = useParams()

  useEffect(() => {
    setVideos(getVideo(vanityUrl!))
  }, [vanityUrl])

  return (
    <div>
      {videos && <VideoPlayer video={videos} />}
    </div>
  )
}

export default VideoReels