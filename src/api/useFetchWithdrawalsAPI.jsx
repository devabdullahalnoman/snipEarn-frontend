import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useFetchWithdrawalsAPI = () => {
  const axiosSecure = useAxiosSecure();

  const fetchWithdrawalsPromise = (workerEmail) => {
    return axiosSecure
      .get(`/withdrawals?workerEmail=${workerEmail}`)
      .then((res) => res.data);
  };

  return { fetchWithdrawalsPromise };
};

export default useFetchWithdrawalsAPI;
