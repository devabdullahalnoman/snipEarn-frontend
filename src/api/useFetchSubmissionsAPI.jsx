import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useFetchSubmissionsAPI = () => {
  const axiosSecure = useAxiosSecure();

  const fetchSubmissionsPromise = (email, page = 1, limit = 10) => {
    return axiosSecure
      .get(`/submissions/${email}?page=${page}&limit=${limit}`)
      .then((res) => res.data);
  };

  return { fetchSubmissionsPromise };
};

export default useFetchSubmissionsAPI;
