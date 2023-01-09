import { useParams } from "react-router-dom";

import "./Checkout.styles.scss";

const CheckoutFailure = () => {
  const { userUuid } = useParams();
  console.log('user',userUuid);
  return (
    <div className="checkout-container">
      <div className="checkout-response-logo">
      </div>
      <h1>Transaction canceled</h1>
      <h2>Something went wrong</h2>
      <p>Please try again later</p>
    </div>
  )
}

export default CheckoutFailure;
