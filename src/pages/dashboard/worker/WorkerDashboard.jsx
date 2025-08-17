import React from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useFetchSubmissionsAPI from "../../../api/useFetchSubmissionsAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";
import StatCard from "../../../components/StatCard";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const { fetchSubmissionsPromise } = useFetchSubmissionsAPI();

  const { data, isLoading, error } = useQuery({
    queryKey: ["submissions", user.email],
    queryFn: () => fetchSubmissionsPromise(user.email),
    enabled: !!user?.email,
  });

  const submissions = data?.submissions || [];

  const total = submissions.length;
  const pending = submissions.filter((sub) => sub.status === "pending").length;
  const earnings = submissions
    .filter((sub) => sub.status === "approved")
    .reduce((sum, sub) => sum + (sub.payable_amount || 0), 0);

  const approvedSubs = submissions.filter((sub) => sub.status === "approved");

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <div className="p-4 text-red-600">Error loading submissions</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Worker Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Submissions" value={total} />
        <StatCard title="Pending Submissions" value={pending} />
        <StatCard title="Total Earnings ($)" value={earnings.toFixed(2)} />
      </div>

      <h3 className="text-xl font-semibold mb-4">Approved Submissions</h3>
      {approvedSubs.length === 0 ? (
        <p>No approved submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>Buyer Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubs.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.taskTitle}</td>
                  <td>{sub.payable_amount}</td>
                  <td>{sub.buyerName}</td>
                  <td>
                    <span className="badge badge-success">
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
