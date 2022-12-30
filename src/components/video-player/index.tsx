import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'

import { VideoType } from '../../api/video-api'
import { BsVolumeMuteFill, BsVolumeDownFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import ApplePayLogo from '../../assets/images/logos/Apple Pay Logo White 2.png'

import './video-player.scss'

type VideoPlayerProps = {
  video : VideoType
}

const VideoPlayer = ({ video } : VideoPlayerProps) => {
  const [muted, setMuted] = useState(false)
  const [isPlayed, setIsPlayed] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const navigate = useNavigate()

  const muteVideo = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setMuted(current => !current)
  }

  const close = () => {
    navigate(-1); // history.goBack()
  }

  const pauseVideo = (e: any) => {
    const video = videoRef.current
    if (isPlayed && video)  {
      video.pause()
      setIsPlayed(false)
    } else {
      video && video.play()
      setIsPlayed(true)
    }
  }

  // to allow autoplay with video unmuted
  const videoLoaded = (e: any) => {
    const video = videoRef.current
    if (video) {
      video.play()
      setIsPlayed(true)
    }
  }

  return (
    <div className='video-player'>
      <video
        ref={videoRef}
        src={video.url}
        // autoPlay
        loop
        muted={muted}
        onLoadedData={videoLoaded}
      />
      <div className='videoPlayer-content' onClick={pauseVideo}>
        <div className='videoPlayer-top'>
          <div className='videoPlayer-top-close' onClick={close}>
            <AiFillCloseCircle />
          </div>
          <div className='videoPlayer-pay-icon'>
            <img src={ApplePayLogo} alt='Apple Pay' />
          </div>
        </div>
        <div className='videoPlayer-bottom'>
          <div className='videoPlayer-mute-icon' onClick={muteVideo}>
            {muted ? <BsVolumeMuteFill /> : <BsVolumeDownFill />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
