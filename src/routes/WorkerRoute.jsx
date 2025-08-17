import React from "react";
import { Navigate, useLocation } from "react-router";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../layout/shared/LoadingSpinner";

const WorkerRoute = ({ children }) => {
  const { role, loading } = useUserRole();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (role !== "worker") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default WorkerRoute;
