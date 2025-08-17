import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useCoinPurchaseHistoryAPI = () => {
  const axiosSecure = useAxiosSecure();

  const fetchHistory = async (email) => {
    return axiosSecure
      .get(`/coins/history?email=${email}`)
      .then((res) => res.data);
  };

  return { fetchHistory };
};

export default useCoinPurchaseHistoryAPI;
