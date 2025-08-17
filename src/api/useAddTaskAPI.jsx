import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useAddTaskAPI = () => {
  const axiosSecure = useAxiosSecure();

  const addTaskPromise = (taskInfo) => {
    return axiosSecure.post("/tasks", taskInfo).then((res) => res.data);
  };

  return { addTaskPromise };
};

export default useAddTaskAPI;
