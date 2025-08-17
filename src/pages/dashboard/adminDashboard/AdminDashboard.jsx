import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAdminOverviewAPI from "../../../api/useAdminOverviewAPI";
import useAdminWithdrawAPI from "../../../api/useAdminWithdrawAPI";

const AdminDashboard = () => {
  const { fetchOverview } = useAdminOverviewAPI();
  const { approveWithdrawal } = useAdminWithdrawAPI();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: fetchOverview,
  });

  const mutation = useMutation({
    mutationFn: approveWithdrawal,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Withdrawal Approved",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text: "Unable to approve withdrawal. Please try again.",
      });
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading overview...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load data</p>
    );
  }

  const {
    totalWorkers,
    totalBuyers,
    totalCoins,
    totalPayments,
    pendingWithdrawals,
  } = data;

  const handleApprove = async (_id) => {
    const confirm = await Swal.fire({
      title: "Approve this withdrawal?",
      text: "This will transfer coins and mark the request as fulfilled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (confirm.isConfirmed) {
      mutation.mutate(_id);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-center">Admin Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-base-300 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Workers</h3>
          <p className="text-2xl">{totalWorkers}</p>
        </div>
        <div className="bg-base-300 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Buyers</h3>
          <p className="text-2xl">{totalBuyers}</p>
        </div>
        <div className="bg-base-300 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Coins</h3>
          <p className="text-2xl">{totalCoins}</p>
        </div>
        <div className="bg-base-300 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Payments ($)</h3>
          <p className="text-2xl">${Number(totalPayments).toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Pending Withdrawals</h3>

        {pendingWithdrawals.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Email</th>
                  <th>Coins</th>
                  <th>Amount ($)</th>
                  <th>System</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map((w) => (
                  <tr key={w._id}>
                    <td>{w.worker_name}</td>
                    <td>{w.worker_email}</td>
                    <td>{w.withdrawal_coin}</td>
                    <td>${w.withdrawal_amount}</td>
                    <td>{w.payment_system}</td>
                    <td>{new Date(w.withdraw_date).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleApprove(w._id)}
                        className="btn btn-sm btn-success"
                        disabled={mutation.isLoading}
                      >
                        {mutation.isLoading ? "Approving…" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
