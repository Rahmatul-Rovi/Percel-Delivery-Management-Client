import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  //  Load parcel info
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  const amount = Number(parcelInfo?.deliveryCost) || 0;

  // 🔹 Create Payment Intent
  useEffect(() => {
    if (amount > 0 && parcelInfo?.paymentStatus !== "paid") {
      axiosSecure.post("/create-payment-intent", { amount }).then(res => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [amount, axiosSecure, parcelInfo?.paymentStatus]);

  //  Handle payment submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      setErrorMessage(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        parcelId: id,
        email: parcelInfo.senderEmail,
        amount: amount,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      await axiosSecure.post("/payments", paymentInfo);

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your parcel payment has been completed successfully!",
        confirmButtonColor: "#f97316",
      });
    }

    setProcessing(false);
  };

  //  Loading UI
  if (isPending) {
    return <p className="text-center">Loading payment info...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6  rounded-xl shadow">
      
      {/*  IF ALREADY PAID */}
      {parcelInfo.paymentStatus === "paid" ? (
        <div className="text-center">
          <h3 className="text-green-600 font-semibold text-lg">
            ✅ Payment Completed
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Transaction ID:
          </p>
          <p className="text-xs break-all text-gray-700">
            {parcelInfo.transactionId}
          </p>
        </div>
      ) : (
        /*  PAYMENT FORM */
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            disabled={!stripe || processing || !clientSecret}
            className="w-full py-2 bg-orange-500 text-white rounded disabled:bg-gray-400"
          >
            {processing ? "Processing..." : `Pay $${amount}`}
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
