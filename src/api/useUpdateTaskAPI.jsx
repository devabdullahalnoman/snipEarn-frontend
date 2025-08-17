import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useUpdateTaskAPI = () => {
  const axiosSecure = useAxiosSecure();

  const updateTaskPromise = (id, updates) => {
    return axiosSecure.patch(`/tasks/${id}`, updates).then((res) => res.data);
  };

  return { updateTaskPromise };
};

export default useUpdateTaskAPI;
