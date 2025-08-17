import useAxiosSecure from "../hooks/useAxiosSecure";

const useAddSpentCoinsAPI = () => {
  const axiosSecure = useAxiosSecure();

  const addSpentCoinsPromise = (email, coins) => {
    return axiosSecure
      .patch(`/users/add-spent/${email}`, { coins })
      .then((res) => res.data);
  };

  return { addSpentCoinsPromise };
};

export default useAddSpentCoinsAPI;
