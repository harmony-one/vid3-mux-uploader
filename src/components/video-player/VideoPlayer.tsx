import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";

import { VideoType } from "../../util/api/video-api";
import { BsVolumeMuteFill, BsVolumeDownFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import ApplePayLogo from "../../assets/images/logos/Apple Pay Logo White 2.png";

import { VideoPlayerContainer } from "./VideoPlayer.styles";

type VideoPlayerProps = {
  video: VideoType;
};

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [muted, setMuted] = useState(true);
  const [opaque, setOpaque] = useState(0.5);
  const [isPlayed, setIsPlayed] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { ref, inView } = useInView({
    /* Optional options */
    rootMargin: "0px",
    root: null,
    threshold: 0.1,
  });

  const navigate = useNavigate();


  const muteVideo = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setMuted((current) => !current);
  };

  const close = () => {
    navigate(-1); // history.goBack()
  };

  const pauseVideo = (e: any) => {
    const video = videoRef.current;
    if (isPlayed && video) {
      video.pause();
      setIsPlayed(false);
    } else {
      video && video.play();
      setIsPlayed(true);
    }
  };

  const purchaseButton = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    console.log(e);
  };

  useEffect(() => {
    if (!inView) {
      setMuted(true);
      setOpaque(0.5);
    } else {
      setTimeout(function () {
        setOpaque(0);
      }, 3000);
    }
  }, [inView]);

  console.log(opaque)
  return (
    <VideoPlayerContainer opacity={opaque} ref={ref}>
      <video
        ref={videoRef}
        src={video.url}
        playsInline
        autoPlay
        preload={inView ? "auto" : "none"}
        loop
        muted={muted}
      />
      <div className="videoPlayer-content" onClick={pauseVideo}>
        <div className="videoPlayer-top">
          <div className="videoPlayer-top-close" onClick={close}>
            <AiFillCloseCircle />
          </div>
          {video.merchandiseId && (
            <div className="videoPlayer-pay-icon" onClick={purchaseButton}>
              <img src={ApplePayLogo} alt="Apple Pay" />
            </div>
          )}
        </div>
        <div className="videoPlayer-bottom">
          <div className="videoPlayer-mute-icon" onClick={muteVideo}>
            {muted ? <BsVolumeMuteFill /> : <BsVolumeDownFill />}
          </div>
        </div>
      </div>
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
