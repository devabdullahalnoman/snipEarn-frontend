import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useManageTasksAPI from "../../../api/useManageTasksAPI";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const { getTasks, deleteTask } = useManageTasksAPI();

  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allTasks"],
    queryFn: getTasks,
  });

  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Task removed successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Unable to delete task",
      });
    },
  });

  const handleDelete = async (_id) => {
    const confirm = await Swal.fire({
      title: "Delete this task?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      mutation.mutate(_id);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading tasks...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load tasks</p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Manage Tasks</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Buyer</th>
              <th>Email</th>
              <th>Required Worker</th>
              <th>Coins</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.buyerName}</td>
                <td>{task.buyerEmail}</td>
                <td>{task.required_worker}</td>
                <td>{task.coinsOffered}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm btn-error"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
