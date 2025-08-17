import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useCreatePaymentIntentAPI from "../../../api/useCreatePaymentIntentAPI";
import useCoinPurchaseAPI from "../../../api/useCoinPurchaseAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const coinPlans = [
  { id: "10", coins: 10, price: 1 },
  { id: "150", coins: 150, price: 10 },
  { id: "500", coins: 500, price: 20 },
  { id: "1000", coins: 1000, price: 35 },
];

const PurchaseCoins = () => {
  const { coins: currentCoins, loading, refetch } = useUserRole();
  const [plan, setPlan] = useState(null);

  if (loading) return <LoadingSpinner />;

  if (!plan) {
    return (
      <div>
        <h1 className="text-2xl font-bold my-4 text-center">Purchase Coin</h1>
        <div className="mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {coinPlans.map((p) => (
            <div
              key={p.id}
              onClick={() => setPlan(p)}
              className="cursor-pointer border rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold">{p.coins} coins</h3>
              <p className="mt-2 text-xl">${p.price}</p>
            </div>
          ))}
        </div>
        <p className="col-span-2 mt-4 text-center">
          Current Balance: <strong>{currentCoins}</strong> coins
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CoinPaymentForm
        plan={plan}
        onBack={() => setPlan(null)}
        refetchCoins={refetch}
      />
    </Elements>
  );
};

const CoinPaymentForm = ({ plan, onBack, refetchCoins }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { createPaymentIntent } = useCreatePaymentIntentAPI();
  const { recordCoinPurchase } = useCoinPurchaseAPI();

  const [errorMsg, setErrorMsg] = useState("");

  const intentMutation = useMutation({
    mutationFn: () =>
      createPaymentIntent({
        amountInCents: Math.round(plan.price * 100),
      }),
    onError: (err) => {
      setErrorMsg("Failed to start payment. Try again.", err);
    },
  });

  const purchaseMutation = useMutation({
    mutationFn: (data) => recordCoinPurchase(data),
    onSuccess: async () => {
      await refetchCoins();
      Swal.fire("Success", `You purchased ${plan.coins} coins!`, "success");
      navigate("/dashboard");
    },
    onError: (err) => {
      Swal.fire("Error", "Could not record purchase.", err);
    },
  });

  const isBusy =
    intentMutation.isLoading ||
    purchaseMutation.isLoading ||
    !stripe ||
    !elements;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (pmError) {
      setErrorMsg(pmError.message);
      return;
    }

    const { clientSecret } = await intentMutation.mutateAsync();

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
    if (confirmError) {
      setErrorMsg(confirmError.message);
      return;
    }

    purchaseMutation.mutate({
      email: user.email,
      coinsPurchased: plan.coins,
      transactionId: paymentIntent.id,
      amount: plan.price,
      paymentMethod: paymentIntent.payment_method_types[0],
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline"
        disabled={isBusy}
      >
        ← Change plan
      </button>

      <h2 className="text-2xl font-bold">
        Pay for {plan.coins} coins — ${plan.price}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-2 border rounded bg-white">
          <CardElement />
        </div>

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isBusy}
        >
          {isBusy ? "Processing…" : `Pay $${plan.price}`}
        </button>
      </form>
    </div>
  );
};

export default PurchaseCoins;
