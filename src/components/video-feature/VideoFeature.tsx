import { useNavigate } from "react-router-dom";
import { VideoType } from "../../util/api/video-api";
import ApplePayLogo from "../../assets/images/logos/Apple Pay Logo White 2.png";

import "./VideoFeature.styles.scss";

type FeatureVideoProps = {
  feature: VideoType;
};

const VideoFeature = ({ feature }: FeatureVideoProps) => {
  console.log("JAJAAAJ", feature);
  const navigate = useNavigate();

  const watchVideo = (vanityUrl: string) => {
    navigate(`${vanityUrl}`);
  };

  const payButton = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    console.log(e);
  };

  return (
    <div className="feature-video">
      <div className="feature">
        <video
          playsInline
          muted
          autoPlay
          loop
          onClick={() => watchVideo(feature.vanityUrl)}
        >
          <source type="video/mp4" src={feature.url} />
        </video>
        <div className="feature-content">
          <div className="feature-pay-icon" onClick={payButton}>
            <img src={ApplePayLogo} alt="Apple Pay" />
          </div>
        </div>
      </div>
      <span>You can pay-per-view this video</span>
    </div>
  );
};

export default VideoFeature;
