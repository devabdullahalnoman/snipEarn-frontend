import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useFetchBuyerSubmissionsAPI = () => {
  const axiosSecure = useAxiosSecure();

  const fetchBuyerSubmissionsPromise = (email) => {
    return axiosSecure
      .get(`/buyer/submissions?email=${email}`)
      .then((res) => res.data);
  };

  return { fetchBuyerSubmissionsPromise };
};

export default useFetchBuyerSubmissionsAPI;
