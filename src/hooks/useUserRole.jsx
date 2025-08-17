import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useFetchUserAPI from "../api/useFetchUserAPI";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const { fetchUserPromise } = useFetchUserAPI();

  const userQuery = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => fetchUserPromise(user.email),
    enabled: !!user?.email,
  });

  return {
    role: userQuery.data?.role || "",
    coins: userQuery.data?.coins || 0,
    loading: authLoading || userQuery.isLoading,
    error: userQuery.error,
    refetch: userQuery.refetch,
    spentCoins: userQuery.data?.spentCoins,
  };
};

export default useUserRole;
