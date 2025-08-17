import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useUpdateUserCoinsAPI = () => {
  const axiosSecure = useAxiosSecure();

  const updateUserCoinsPromise = ({ email, coins }) => {
    return axiosSecure
      .patch(`/users/${email}`, { coins })
      .then((res) => res.data);
  };

  return { updateUserCoinsPromise };
};

export default useUpdateUserCoinsAPI;
