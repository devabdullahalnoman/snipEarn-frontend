import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useAdminWithdrawAPI = () => {
  const axiosSecure = useAxiosSecure();

  const approveWithdrawal = (id) => {
    return axiosSecure
      .patch(`/admin/approve-withdrawal/${id}`)
      .then((res) => res.data);
  };

  return { approveWithdrawal };
};

export default useAdminWithdrawAPI;
