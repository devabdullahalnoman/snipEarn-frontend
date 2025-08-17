import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useDeleteTaskAPI = () => {
  const axiosSecure = useAxiosSecure();

  const deleteTaskPromise = (id) => {
    return axiosSecure.delete(`/tasks/${id}`).then((res) => res.data);
  };

  return { deleteTaskPromise };
};

export default useDeleteTaskAPI;
