import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const usePurchaseCoinAPI = () => {
  const axiosSecure = useAxiosSecure();

  const purchaseCoinPromise = (details) => {
    return axiosSecure
      .post("/payments/purchase", details)
      .then((res) => res.data);
  };

  return { purchaseCoinPromise };
};

export default usePurchaseCoinAPI;
