import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useFetchUserAPI = () => {
  const axiosSecure = useAxiosSecure();

  const fetchUserPromise = (email) => {
    return axiosSecure.get(`/users/${email}`).then(res => res.data);
  };

  return { fetchUserPromise };
};

export default useFetchUserAPI;

