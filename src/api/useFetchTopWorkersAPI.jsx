import useAxios from "../hooks/useAxios";

const useFetchTopWorkersAPI = () => {
  const fetchTopWorkers = () => {
    return useAxios.get("/users/top-workers").then((res) => res.data);
  };

  return { fetchTopWorkers };
};

export default useFetchTopWorkersAPI;
