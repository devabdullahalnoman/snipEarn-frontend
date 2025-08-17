import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useFetchSubmissionsAPI from "../../../api/useFetchSubmissionsAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";

const MySubmissions = () => {
  const { user } = useAuth();
  const { fetchSubmissionsPromise } = useFetchSubmissionsAPI();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["submissions", user.email, page],
    queryFn: () => fetchSubmissionsPromise(user.email, page, limit),
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const { submissions = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  const [selectedSub, setSelectedSub] = useState(null);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-4 text-red-600">Error loading your submissions.</div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Submitted On</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td>{submission.taskTitle}</td>
                    <td>{submission.buyerName}</td>
                    <td>{submission.payable_amount}</td>
                    <td>
                      <span
                        className={
                          submission.status === "approved"
                            ? "badge badge-success"
                            : submission.status === "rejected"
                            ? "badge badge-error"
                            : "badge badge-warning"
                        }
                      >
                        {submission.status.charAt(0).toUpperCase() +
                          submission.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedSub(submission)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  className={`btn btn-sm ${
                    pageNum === page ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>
        </>
      )}

      {selectedSub && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-2">
              {selectedSub.taskTitle} — Submission
            </h3>
            <p>
              <strong>Status:</strong>{" "}
              {selectedSub.status.charAt(0).toUpperCase() +
                selectedSub.status.slice(1)}
            </p>
            <p>
              <strong>Submitted On:</strong>{" "}
              {new Date(selectedSub.createdAt).toLocaleString()}
            </p>
            <div className="mt-4">
              <strong>Details / Link:</strong>
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
export default MySubmissions;
