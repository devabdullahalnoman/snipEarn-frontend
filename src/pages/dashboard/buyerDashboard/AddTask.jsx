import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useAddTaskAPI from "../../../api/useAddTaskAPI";
import useUpdateUserCoinsAPI from "../../../api/useUpdateUserCoinsAPI";
import useAddSpentCoinsAPI from "../../../api/useAddSpentCoinsAPI";
import useImageUpload from "../../../hooks/useImageUpload";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";

const AddTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { coins, loading: roleLoading, refetch: refetchUser } = useUserRole();
  const { addTaskPromise } = useAddTaskAPI();
  const { updateUserCoinsPromise } = useUpdateUserCoinsAPI();
  const { addSpentCoinsPromise } = useAddSpentCoinsAPI();
  const { uploadImage } = useImageUpload();

  const [taskImageUrl, setTaskImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      taskDetail: "",
      requiredWorkers: 1,
      payableAmount: 0,
      completionDate: "",
      submissionInfo: "",
    },
  });

  const requiredWorkers = Number(watch("requiredWorkers") || 0);
  const payableAmount = Number(watch("payableAmount") || 0);
  const totalPayable = requiredWorkers * payableAmount;

  const handleTaskImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setTaskImageUrl(url);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Could not upload task image. Please try again.",
        err,
      });
    }
    setUploading(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      await addTaskPromise({
        title: data.taskTitle,
        buyerName: user.displayName,
        description: data.taskDetail,
        required_worker: data.requiredWorkers,
        coinsOffered: data.payableAmount,
        buyerEmail: user.email,
        completionDate: data.completionDate,
        submissionInfo: data.submissionInfo,
        taskImageUrl,
      });

      await updateUserCoinsPromise({
        email: user.email,
        coins: coins - totalPayable,
      });

      await addSpentCoinsPromise(user.email, totalPayable);
    },
    onSuccess: async () => {
      await refetchUser();
      reset();
      Swal.fire({
        icon: "success",
        title: "Task Added!",
        text: "Your task has been created successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard/buyer/my-tasks");
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add task. Please try again.",
      });
    },
  });

  if (roleLoading) return <LoadingSpinner />;

  const onSubmit = (data) => {
    if (totalPayable > coins) {
      Swal.fire({
        icon: "warning",
        title: "Insufficient Coins",
        text: "You don't have enough coins to post this task.",
      }).then(() => {
        navigate("/dashboard/buyer/purchase-coin");
      });
      return;
    }

    mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Task Title</label>
          <input
            {...register("taskTitle", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.taskTitle && (
            <p className="text-red-600">{errors.taskTitle.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Task Detail</label>
          <textarea
            {...register("taskDetail", { required: "Detail is required" })}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          {errors.taskDetail && (
            <p className="text-red-600">{errors.taskDetail.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Required Workers</label>
            <input
              type="number"
              {...register("requiredWorkers", {
                valueAsNumber: true,
                min: { value: 1, message: "At least 1 worker" },
              })}
              className="input input-bordered w-full"
            />
            {errors.requiredWorkers && (
              <p className="text-red-600">{errors.requiredWorkers.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Payable Amount</label>
            <input
              type="number"
              {...register("payableAmount", {
                valueAsNumber: true,
                min: { value: 0, message: "Must be ≥ 0" },
              })}
              className="input input-bordered w-full"
            />
            {errors.payableAmount && (
              <p className="text-red-600">{errors.payableAmount.message}</p>
            )}
          </div>
        </div>

        <div>
          <span>Total payable coins: </span>
          <strong>{totalPayable}</strong>
        </div>

        <div>
          <label className="block mb-1">Completion Date</label>
          <input
            type="date"
            {...register("completionDate", {
              required: "Completion date is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.completionDate && (
            <p className="text-red-600">{errors.completionDate.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Submission Info</label>
          <input
            {...register("submissionInfo", {
              required: "Submission info is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.submissionInfo && (
            <p className="text-red-600">{errors.submissionInfo.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Task Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleTaskImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {uploading && (
            <p className="text-yellow-600 mt-1">Uploading image…</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || uploading}
        >
          {isLoading ? <LoadingSpinner /> : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
