import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useFetchTasksAPI from "../../../api/useFetchTasksAPI";
import useAddSubmissionAPI from "../../../api/useAddSubmissionAPI";
import LoadingSpinner from "../../../layout/shared/LoadingSpinner";
import useUpdateWorkerCountAPI from "../../../api/useUpdateWorkerCountAPI";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchTaskByIdPromise } = useFetchTasksAPI();
  const { addSubmissionPromise } = useAddSubmissionAPI();
  const { updateWorkerCountPromise } = useUpdateWorkerCountAPI();

  const {
    data: task,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskByIdPromise(id),
    enabled: !!id,
  });

  const { register, handleSubmit } = useForm();

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async ({ submissionInfo }) => {
      await addSubmissionPromise({
        taskId: id,
        taskTitle: task.title,
        payable_amount: task.coinsOffered,
        workerEmail: user.email,
        workerName: user.displayName,
        buyerEmail: task.buyerEmail,
        buyerName: task.buyerName,
        submission_info: submissionInfo,
      });
      await updateWorkerCountPromise(id, task.required_worker - 1);
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Submitted!", "Your work has been sent.", "success");
      navigate("/dashboard/worker/my-submissions");
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit, please try again.", "error");
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-4 text-red-600">
        Error loading task details. Please go back.
      </div>
    );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
      <div>
        {task.taskImageUrl && (
          <img
            src={task.taskImageUrl}
            alt={task.title}
            className="mb-6 max-h-60 sm:max-h-86 md:max-h-96 w-full object-cover rounded-2xl"
          />
        )}
      </div>
      <div className="mb-4 space-y-1">
        <p>
          <strong>Buyer:</strong> {task.buyerName}
        </p>
        <p>
          <strong>Pay:</strong> {task.coinsOffered} coins
        </p>
        <p>
          <strong>Slots left:</strong> {task.required_worker}
        </p>
        {task.completionDate && (
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(task.completionDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">Submit Your Work</h3>
      <p className="mb-4">{task.description}</p>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1">Submission Details</label>
          <textarea
            {...register("submissionInfo", {
              required: "Please provide your submission info or link",
            })}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary ${isSubmitting && "loading"}`}
        >
          Submit Work
        </button>
      </form>
    </div>
  );
};
export default TaskDetails;
