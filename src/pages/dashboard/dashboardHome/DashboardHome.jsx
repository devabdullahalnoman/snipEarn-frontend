import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";
import WorkerDashboard from "../worker/WorkerDashboard";
import BuyerDashboard from "../buyerDashboard/BuyerDashboard";
import AdminDashboard from "../adminDashboard/AdminDashboard";
import Forbidden from "../../forbidden/Forbidden";

const DashboardHome = () => {
  const { role, loading } = useUserRole();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "worker") {
    return <WorkerDashboard></WorkerDashboard>;
  }
  if (role === "buyer") {
    return <BuyerDashboard></BuyerDashboard>;
  }
  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  }

  return <Forbidden></Forbidden>;
};

export default DashboardHome;
