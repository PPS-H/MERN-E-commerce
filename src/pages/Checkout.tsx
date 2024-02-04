import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const order = {};

    const { paymentIntent, error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: { return_url: window.location.origin},
      redirect: "if_required",
    });

    // const { paymentIntent, error } = await stripe.retrievePaymentIntent(
    //   "pi_3Of4TQSEw55mHWf61npEhF7a_secret_s2KwRdyV3ybPgsb4HqIicbKE9"
    // );

    console.log(paymentIntent, error);

    if (error) {
      console.log(error);

      setIsProcessing(false);
      return toast.error(error.message || "Something went wrong");
    }
    if (paymentIntent.status === "succeeded") {
      console.log("Placing order");
      navigate("/orders");
    }
    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};
function Checkout() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "pi_3OfQufSEw55mHWf60vgC5WDa_secret_9OKFKFyOJT8cNeNRLVcB5Hl1J",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;

// router.post("/create-checkout-session", async (req, res) => {
//   const customer = await stripe.customers.create({
//     metadata: {
//       userId: req.body.data.user.user_id,
//       cart: JSON.stringify(req.body.data.cart),
//       total: req.body.data.total,
//     },
//   });
//   const line_items = req.body.data.cart.map((item) => {
//     return {
//       price_data: {
//         currency: "inr",
//         product_data
