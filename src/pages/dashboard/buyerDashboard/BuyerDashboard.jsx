import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useFetchTasksAPI from "../../../api/useFetchTasksAPI";
import useUpdateSubmissionAPI from "../../../api/useUpdateSubmissionAPI";
import useUpdateUserCoinsAPI from "../../../api/useUpdateUserCoinsAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";
import StatCard from "../../../components/StatCard";
import useFetchBuyerSubmissionsAPI from "../../../api/useFetchBuyerSubmissionsAPI";
import useCoinPurchaseHistoryAPI from "../../../api/useCoinPurchaseHistoryAPI";

const BuyerDashboard = () => {
  const { user } = useAuth();
  const {
    refetch: refetchUserRole,
    loading: roleLoading,
    spentCoins,
  } = useUserRole();
  const [selectedSub, setSelectedSub] = useState(null);

  const { fetchTasksPromise } = useFetchTasksAPI();
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["buyerTasks", user.email],
    queryFn: () => fetchTasksPromise({ buyerEmail: user.email }),
    enabled: !!user.email,
  });
  const totalPosted = tasks.length;
  const stillOpen = tasks.filter((task) => task.required_worker > 0).length;
  const pendingTaskCount = tasks.reduce(
    (sum, task) => sum + (task.required_worker || 0),
    0
  );

  const { fetchHistory } = useCoinPurchaseHistoryAPI();
  const {
    data: purchaseHistory = [],
    isLoading: historyLoading,
    error: historyError,
  } = useQuery({
    queryKey: ["coinPurchaseHistory", user.email],
    queryFn: () => fetchHistory(user.email),
    enabled: !!user.email,
  });

  const totalUSDSpent = purchaseHistory.reduce(
    (sum, record) => sum + (record.amount || 0),
    0
  );

  const { fetchBuyerSubmissionsPromise } = useFetchBuyerSubmissionsAPI();
  const {
    data: submissions = [],
    isLoading: subsLoading,
    error: subsError,
    refetch: refetchSubs,
  } = useQuery({
    queryKey: ["buyerSubmissions", user.email],
    queryFn: () => fetchBuyerSubmissionsPromise(user.email),
    enabled: !!user.email,
  });
  const pendingSubs = submissions.filter((s) => s.status === "pending");

  const { updateSubmissionPromise } = useUpdateSubmissionAPI();
  const { updateUserCoinsPromise } = useUpdateUserCoinsAPI();

  const approveMutation = useMutation({
    mutationFn: async (sub) => {
      await updateSubmissionPromise(sub._id, { status: "approved" });
      await updateUserCoinsPromise({
        email: sub.workerEmail,
        coins: sub.coins,
      });
    },
    onSuccess: () => {
      refetchSubs();
      refetchUserRole();
      setSelectedSub(null);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (sub) => {
      await updateSubmissionPromise(sub._id, { status: "rejected" });
    },
    onSuccess: () => {
      refetchSubs();
      refetchTasks();
      setSelectedSub(null);
    },
  });

  if (roleLoading || tasksLoading || subsLoading || historyLoading)
    return <LoadingSpinner />;

  if (tasksError || subsError || historyError)
    return (
      <div className="p-4 text-red-600">Error loading dashboard data.</div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Buyer Dashboard</h2>

      <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Posted" value={totalPosted} />
        <StatCard title="Still Open" value={stillOpen} />
        <StatCard title="Pending Tasks" value={pendingTaskCount} />
        <StatCard title="Coins Spent" value={spentCoins} />
        <StatCard
          title="Total Purchases ($)"
          value={totalUSDSpent.toFixed(2)}
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">Tasks To Review</h3>
      {pendingSubs.length === 0 ? (
        <p>No submissions pending review.</p>
      ) : (
        <table className="table w-full mb-4">
          <thead>
            <tr>
              <th>Worker</th>
              <th>Task</th>
              <th>Amount</th>
              <th>View</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubs.map((sub) => (
              <tr key={sub._id}>
                <td>{sub.workerName}</td>
                <td>{sub.taskTitle}</td>
                <td>{sub.payable_amount}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => setSelectedSub(sub)}
                  >
                    View
                  </button>
                </td>
                <td className="space-x-2 flex">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => approveMutation.mutate(sub)}
                    disabled={approveMutation.isLoading}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => rejectMutation.mutate(sub)}
                    disabled={rejectMutation.isLoading}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedSub && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-2">Submission Details</h3>
            <p>
              <strong>Worker:</strong> {selectedSub.workerName}
            </p>
            <p>
              <strong>Task:</strong> {selectedSub.taskTitle}
            </p>
            <p>
              <strong>Amount:</strong> {selectedSub.payable_amount} coins
            </p>
            <p className="mt-2">
              <strong>Submitted At:</strong>{" "}
              {new Date(selectedSub.createdAt).toLocaleString()}
            </p>
            <div className="mt-4">
              <strong>Details:</strong>
              <div className="p-2 bg-base-200 rounded mt-1 break-words">
                {selectedSub.submissionInfo}
              </div>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedSub(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
