import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useFetchTasksAPI from "../../../api/useFetchTasksAPI";
import useUpdateTaskAPI from "../../../api/useUpdateTaskAPI";
import useDeleteTaskAPI from "../../../api/useDeleteTaskAPI";
import useUpdateUserCoinsAPI from "../../../api/useUpdateUserCoinsAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";

const defaultFormData = {
  title: "",
  description: "",
  submissionInfo: "",
  required_worker: 1,
  coinsOffered: 0,
  completionDate: "",
  taskImageUrl: "",
};

const MyTasks = () => {
  const { user } = useAuth();
  const {
    coins: currentCoins,
    refetch: refetchUser,
    loading: coinsLoading,
  } = useUserRole();

  const { fetchTasksPromise } = useFetchTasksAPI();
  const tasksQuery = useQuery({
    queryKey: ["buyerTasks", user?.email],
    queryFn: () => fetchTasksPromise({ buyerEmail: user.email }),
    enabled: Boolean(user?.email),
  });

  const { updateTaskPromise } = useUpdateTaskAPI();
  const { deleteTaskPromise } = useDeleteTaskAPI();
  const { updateUserCoinsPromise } = useUpdateUserCoinsAPI();

  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }) => {
      await updateTaskPromise(id, updates);

      const oldTotal = editingTask.required_worker * editingTask.coinsOffered;
      const newTotal = updates.required_worker * updates.coinsOffered;
      const diff = oldTotal - newTotal;
      if (diff !== 0) {
        await updateUserCoinsPromise({
          email: user.email,
          coins: currentCoins + diff,
        });
      }
    },
    onSuccess: () => {
      tasksQuery.refetch();
      refetchUser();
      Swal.fire("Success", "Task updated successfully", "success");
      setEditingTask(null);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update task", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTaskPromise(id),
    onSuccess: ({ refunded }) => {
      tasksQuery.refetch();
      refetchUser();
      Swal.fire(
        "Deleted",
        `Task removed. Refunded ${refunded} coins to your balance.`,
        "success"
      );
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete task", "error");
    },
  });

  const handleUpdate = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      submissionInfo: task.submissionInfo,
      required_worker: task.required_worker,
      coinsOffered: task.coinsOffered,
      completionDate: task.completionDate
        ? task.completionDate.slice(0, 10)
        : "",
      taskImageUrl: task.taskImageUrl || "",
    });
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete this task?",
      text: "Unfilled slots will be refunded to your coins.",
      icon: "warning",
      showCancelButton: true,
    });
    if (isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  if (tasksQuery.isLoading || coinsLoading) return <LoadingSpinner />;
  if (tasksQuery.error)
    return (
      <div className="p-4 text-red-600">
        Failed to load your tasks. Please refresh.
      </div>
    );

  const sortedTasks = [...tasksQuery.data].sort(
    (a, b) =>
      new Date(b.completionDate || b.createdAt) -
      new Date(a.completionDate || a.createdAt)
  );

  if (sortedTasks.length === 0)
    return (
      <div className="p-4 text-gray-700">
        You haven’t created any tasks yet.&nbsp;
        <Link
          to="/dashboard/buyer/add-task"
          className="underline text-blue-500"
        >
          Add one now
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4 text-center">My Tasks</h1>
      <div className="overflow-x-auto p-4">
      {editingTask && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateMutation.mutate({
                  id: editingTask._id,
                  updates: {
                    title: formData.title,
                    description: formData.description,
                    submissionInfo: formData.submissionInfo,
                    required_worker: Number(formData.required_worker),
                    coinsOffered: Number(formData.coinsOffered),
                    completionDate: formData.completionDate,
                    taskImageUrl: formData.taskImageUrl,
                  },
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1">Title</label>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((data) => ({ ...data, title: e.target.value }))
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Detail</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Submission Info</label>
                <input
                  value={formData.submissionInfo}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      submissionInfo: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Required Workers</label>
                  <input
                    type="number"
                    value={formData.required_worker}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        required_worker: e.target.value,
                      }))
                    }
                    className="input input-bordered w-full"
                    min={1}
                  />
                </div>
                <div>
                  <label className="block mb-1">Payable Amount</label>
                  <input
                    type="number"
                    value={formData.coinsOffered}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        coinsOffered: e.target.value,
                      }))
                    }
                    className="input input-bordered w-full"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1">Completion Date</label>
                <input
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      completionDate: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.taskImageUrl}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      taskImageUrl: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    updateMutation.isLoading ? "loading" : ""
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Detail</th>
            <th>Submission Info</th>
            <th>Coins</th>
            <th>Workers</th>
            <th>Completion Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.submissionInfo}</td>
              <td>{task.coinsOffered}</td>
              <td>{task.required_worker}</td>
              <td>
                {task.completionDate
                  ? new Date(task.completionDate).toLocaleDateString()
                  : "—"}
              </td>
              <td className="space-x-2 flex">
                <button
                  onClick={() => handleUpdate(task)}
                  disabled={updateMutation.isLoading}
                  className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  disabled={deleteMutation.isLoading}
                  className="px-2 py-1 bg-red-200 text-red-800 rounded"
                >
                  Delete
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

export default MyTasks;
