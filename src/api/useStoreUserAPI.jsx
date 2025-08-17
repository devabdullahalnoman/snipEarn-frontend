import useAxios from "../hooks/useAxios";

const useStoreUserAPI = () => {
  const storeUserPromise = (userInfo) =>
    useAxios.post("/users", userInfo).then((res) => res.data);

  return { storeUserPromise };
};

export default useStoreUserAPI;
