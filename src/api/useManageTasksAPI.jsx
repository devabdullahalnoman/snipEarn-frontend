import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useManageTasksAPI = () => {
  const axiosSecure = useAxiosSecure();
  const getTasks = () => {
    return axiosSecure.get("/tasks").then((res) => res.data);
  };

  const deleteTask = (id) => {
    return axiosSecure.delete(`/tasks/${id}`).then((res) => res.data);
  };

  return { getTasks, deleteTask };
};

export default useManageTasksAPI;
