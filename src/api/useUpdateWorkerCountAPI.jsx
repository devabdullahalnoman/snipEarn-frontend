import useAxiosSecure from "../hooks/useAxiosSecure";

const useUpdateWorkerCountAPI = () => {
  const axiosSecure = useAxiosSecure();

  const updateWorkerCountPromise = (taskId, newRequiredCount) => {
    return axiosSecure
      .patch(`/tasks/update-worker-count/${taskId}`, {
        required_worker: newRequiredCount,
      })
      .then((res) => res.data);
  };

  return { updateWorkerCountPromise };
};

export default useUpdateWorkerCountAPI;
