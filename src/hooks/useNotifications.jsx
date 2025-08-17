import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNotifications = (email) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["notifications", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications?toEmail=${email}`);
      return res.data;
    },
    enabled: !!email,
  });
};

export default useNotifications;
