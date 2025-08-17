import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useCoinPurchaseAPI = () => {
  const axiosSecure = useAxiosSecure();

  const recordCoinPurchase = ({
    email,
    coinsPurchased,
    transactionId,
    amount,
    paymentMethod,
  }) => {
    return axiosSecure
      .post("/coins/purchase", {
        email,
        coinsPurchased,
        transactionId,
        amount,
        paymentMethod,
      })
      .then((res) => res.data);
  };

  return { recordCoinPurchase };
};

export default useCoinPurchaseAPI;
