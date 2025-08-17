import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useFetchTasksAPI = () => {
  const axiosSecure = useAxiosSecure();

  const fetchTasksPromise = ({ buyerEmail, open } = {}) => {
    if (buyerEmail) {
      const encodedEmail = encodeURIComponent(buyerEmail);
      return axiosSecure
        .get(`/buyer/tasks?email=${encodedEmail}`)
        .then((res) => res.data);
    }

    if (open === true) {
      return axiosSecure.get("/worker/tasks?open=true").then((res) => res.data);
    }

    return Promise.reject({
      message: "Invalid task query: must provide buyer email or open=true",
    });
  };

  const fetchTaskByIdPromise = (id) => {
    return axiosSecure.get(`/tasks/${id}`).then((res) => res.data);
  };

  return { fetchTasksPromise, fetchTaskByIdPromise };
};

export default useFetchTasksAPI;
