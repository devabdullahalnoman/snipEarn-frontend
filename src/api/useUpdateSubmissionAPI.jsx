import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useUpdateSubmissionAPI = () => {
  const axiosSecure = useAxiosSecure();

  const updateSubmissionPromise = (id, updates) => {
    return axiosSecure
      .patch(`/submissions/${id}`, updates)
      .then((res) => res.data);
  };

  return { updateSubmissionPromise };
};

export default useUpdateSubmissionAPI;
