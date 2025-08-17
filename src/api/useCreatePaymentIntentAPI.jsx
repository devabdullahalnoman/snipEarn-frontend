import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useCreatePaymentIntentAPI = () => {
  const axiosSecure = useAxiosSecure();

  const createPaymentIntent = ({ amountInCents }) => {
    return axiosSecure
      .post("/create-payment-intent", { amountInCents })
      .then((res) => res.data);
  };

  return { createPaymentIntent };
};

export default useCreatePaymentIntentAPI;
