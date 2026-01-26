import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // 🔹 Query (hook always runs)
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  const amount = Number(parcelInfo?.deliveryCost) || 0;

  // 🔹 useEffect MUST be before any return
  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setErrorMessage("");

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (error) {
      setErrorMessage(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("✅ Payment successful");
    }

    setProcessing(false);
  };

  // ✅ Conditional UI render (SAFE)
  if (isPending) {
    return <p className="text-center">Loading payment info...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement />

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <button
          disabled={!stripe || processing || !clientSecret}
          className="w-full py-2 bg-orange-500 text-white rounded"
        >
          {processing ? "Processing..." : `Pay $${amount}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
