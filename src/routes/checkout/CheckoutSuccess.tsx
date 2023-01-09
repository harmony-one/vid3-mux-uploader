import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./Checkout.styles.scss";

const CheckoutSuccess = () => {
  // const [tokenImage, setTokenImage] = useState();
  // const [isMinted, setIsMinted] = useState(false);
  // const { tokenUuid, userUuid } = useParams();
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/'); // nfts/gallery/${userUuid}`);
    //navigate(`/nfts/collectible/${tokenUuid}`);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-container__header">
      </div>
      <div className="checkout-container__sucess">
        <h3>Congratulations!</h3>
      </div>
      <div className="checkout-container__body">
        {/* <div className="checkout-container__body__image">
          {tokenImage && <img src={tokenImage} alt="New Collectible" />}
        </div> */}
        <p>
          You have successfully <br />
          subcribed to owners videos.
        </p>
        <button onClick={handleButton}>
          Return to Video Gallery
        </button>

      </div>
    </div>
  );
};

export default CheckoutSuccess;
