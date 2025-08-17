import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { auth } from "../firebase/firebase.init";

const axiosSecureInstance = axios.create({
  baseURL: "https://snipearn.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecureInstance.interceptors.request.use(
    async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecureInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (error.response?.status === 403 || error.response?.status === 401) {
        const user = auth.currentUser;
        if (user) {
          try {
            const newToken = await user.getIdToken(true);
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axiosSecureInstance(error.config);
          } catch (error) {
            if (error.response?.status === 403) {
              navigate("/forbidden");
            } else if (error.response?.status === 401) {
              logOut()
                .then(() => navigate("/login"))
                .catch(() => {});
            }
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosSecureInstance;
};

export default useAxiosSecure;
