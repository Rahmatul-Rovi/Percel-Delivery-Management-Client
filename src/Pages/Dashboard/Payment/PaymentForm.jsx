import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setErrorMessage(error.message);
            setProcessing(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErrorMessage(null);
            // You can proceed to confirm the payment on your server here
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className="w-full py-3 bg-my-orange hover:bg-my-orange-dark text-white font-bold rounded-xl transition-all disabled:bg-slate-400 disabled:cursor-not-allowed shadow-lg shadow-orange-200 dark:shadow-none"
                >
                    {processing ? 'Processing...' : 'Pay for parcel pickup'}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;