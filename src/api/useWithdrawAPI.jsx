import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useWithdrawAPI = () => {
  const axiosSecure = useAxiosSecure();

  const submitWithdrawal = async (data) => {
    return axiosSecure.post("/withdraw", data).then((res) => res.data);
  };

  return { submitWithdrawal };
};

export default useWithdrawAPI;
