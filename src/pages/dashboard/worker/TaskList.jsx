import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import useFetchTasksAPI from "../../../api/useFetchTasksAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";

const TaskList = () => {
  const { fetchTasksPromise } = useFetchTasksAPI();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["openTasks"],
    queryFn: () => fetchTasksPromise({ open: true }),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-4 text-red-600">
        Error loading tasks. Please try again.
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Open Tasks</h2>

      {tasks.length === 0 ? (
        <p>No open tasks at the moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <div key={task._id} className="card bg-base-100 shadow-lg">
              {task.taskImageUrl && (
                <figure>
                  <img
                    src={task.taskImageUrl}
                    alt={task.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title">{task.title}</h3>
                <p>
                  <span className="font-semibold">Buyer:</span> {task.buyerName}
                </p>
                <p>
                  <span className="font-semibold">Worker Needed:</span>{" "}
                  {task.required_worker}
                </p>
                <p>
                  <span className="font-semibold">Pay:</span>{" "}
                  {task.coinsOffered} coins
                </p>
                {task.completionDate && (
                  <p>
                    <span className="font-semibold">Deadline:</span>{" "}
                    {new Date(task.completionDate).toLocaleDateString()}
                  </p>
                )}
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/dashboard/worker/task-details/${task._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
