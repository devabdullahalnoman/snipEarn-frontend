import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const useManageUsersAPI = () => {
  const axiosSecure = useAxiosSecure();

  const getUsers = () => {
    return axiosSecure.get("/users").then((res) => res.data);
  };

  const deleteUser = (email) => {
    return axiosSecure.delete(`/users/${email}`).then((res) => res.data);
  };

  const updateUserRole = (email, role) => {
    return axiosSecure
      .patch(`/users/role/${email}`, { role })
      .then((res) => res.data);
  };

  return { getUsers, deleteUser, updateUserRole };
};

export default useManageUsersAPI;
