import React from "react";
import { Navigate, useLocation } from "react-router";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../layout/shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { role, loading } = useUserRole();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return <Navigate to="/forbidden" state={{ from: location.pathname }} />;
  }

  return children;
};

export default AdminRoute;
