import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useAddSubmissionAPI = () => {
  const axiosSecure = useAxiosSecure();

  const addSubmissionPromise = (submission) => {
    return axiosSecure.post("/submissions", submission).then((res) => res.data);
  };

  return { addSubmissionPromise };
};

export default useAddSubmissionAPI;
