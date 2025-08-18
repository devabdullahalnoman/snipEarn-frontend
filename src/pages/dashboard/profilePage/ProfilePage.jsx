import React from "react";
import { useQuery } from "@tanstack/react-query";
import useFetchUserAPI from "../../../api/useFetchUserAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const { fetchUserPromise } = useFetchUserAPI();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: () => fetchUserPromise(user.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <div className="p-4 text-red-500">Failed to load user profile.</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>
      <div className="card lg:card-side bg-base-100 shadow-xl p-6">
        <figure className="w-48 h-48">
          <img
            src={userData?.photoURL || "/placeholder-avatar.png"}
            alt={userData?.displayName || "User"}
            className="rounded-full object-cover w-full h-full border"
          />
        </figure>
        <div className="card-body">
          <h3 className="card-title text-3xl">{userData?.displayName}</h3>
          <p className="text-xl">
            <span className="font-bold">Email:</span> {userData?.email}
          </p>
          <p className="text-xl">
            <span className="font-bold">Role:</span> {userData?.role}
          </p>
          <p className="text-xl">
            <span className="font-bold">Coins:</span> {userData?.coins ?? 0}
          </p>
          <p className="text-xl">
            <span className="font-bold">Joined On:</span>{" "}
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
