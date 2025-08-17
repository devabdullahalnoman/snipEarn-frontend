import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://snipearn.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default useAxios;
