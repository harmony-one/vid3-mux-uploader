import React, { useEffect, useState } from 'react'
import VideoPlayer from '../../components/video-player/VideoPlayer';
import Slider from "react-slick";
import { useParams } from 'react-router-dom'
import { getOwnerVideos, VideoType } from '../../util/api/video-api'

import './VideoReels.styles.scss';

const VideoReels = () => {
  const [videos, setVideos] = useState<VideoType[]>([])
  const { vanityUrl } = useParams()

  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //   {
    //     // breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  }

  useEffect(() => {
    let videoList = getOwnerVideos('test');
    const index = videoList.findIndex(v => v.vanityUrl === vanityUrl);
    videoList.unshift(videoList.splice(index, 1)[0])
    setVideos(videoList)

  }, [])

  return (
    <div className='video-reels'>
      <Slider className='carousel' {...sliderSettings}>
        {videos.map((video: any, index: React.Key | null | undefined) => {
          return <VideoPlayer video={video} key={index} />
        })}
      </Slider>
    </div>
  )
}

export default VideoReels;