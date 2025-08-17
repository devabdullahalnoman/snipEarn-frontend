import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useAdminOverviewAPI = () => {
  const axiosSecure = useAxiosSecure();

  const fetchOverview = async () => {
    return axiosSecure.get("/admin/overview").then((res) => res.data);
  };

  return { fetchOverview };
};

export default useAdminOverviewAPI;
