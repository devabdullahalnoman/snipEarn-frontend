import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useCoinPurchaseHistoryAPI from "../../../api/useCoinPurchaseHistoryAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";

const PaymentHistory = () => {
  const { user } = useAuth();
  const { fetchHistory } = useCoinPurchaseHistoryAPI();

  const {
    data: history = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coinPurchaseHistory", user?.email],
    queryFn: () => fetchHistory(user.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to load history: {error.message}
      </p>
    );

  if (history.length === 0)
    return (
      <p className="text-center text-gray-500">No coin purchases found.</p>
    );

  return (
    <div className="overflow-x-auto mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Coins</th>
            <th>Amount ($)</th>
            <th>Transaction ID</th>
            <th>Method</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.coinsPurchased}</td>
              <td>${entry.amount.toFixed(2)}</td>
              <td>
                <code className="text-xs break-all">{entry.transactionId}</code>
              </td>
              <td>{entry.paymentMethod}</td>
              <td>{new Date(entry.purchasedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
