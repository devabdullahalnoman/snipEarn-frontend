import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useWithdrawAPI from "../../../api/useWithdrawAPI";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Withdrawals = () => {
  const { user } = useAuth();
  const { coins, refetch } = useUserRole();
  const { submitWithdrawal } = useWithdrawAPI();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coinToWithdraw: 200,
      paymentSystem: "Bkash",
      accountNumber: "",
    },
  });

  const coinToWithdraw = watch("coinToWithdraw");
  const withdrawalAmount = (coinToWithdraw / 20).toFixed(2);

  const mutation = useMutation({
    mutationFn: submitWithdrawal,
    onSuccess: async () => {
      await refetch();
      Swal.fire("Success", "Withdrawal request submitted!", "success").then(
        () => {
          reset();
          navigate("/dashboard/worker");
        }
      );
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit withdrawal", "error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      worker_email: user.email,
      worker_name: user.displayName,
      withdrawal_coin: Number(data.coinToWithdraw),
      withdrawal_amount: parseFloat(withdrawalAmount),
      payment_system: data.paymentSystem,
      account_number: data.accountNumber,
    });
  };

  return (
    <div className="mx-auto p-6 bg-base-300 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">Withdraw Coins</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-base-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold text-lg">Total Coins</h3>
          <p className="text-2xl text-primary">{coins}</p>
        </div>
        <div className="bg-base-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold text-lg">Total Earnings</h3>
          <p className="text-2xl text-green-600">${(coins / 20).toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <div>
          <label className="block font-medium">Coin to Withdraw</label>
          <input
            type="number"
            {...register("coinToWithdraw", {
              required: true,
              min: 200,
              max: coins,
            })}
            className="input input-bordered w-full"
          />
          {errors.coinToWithdraw && (
            <p className="text-red-500 text-sm mt-1">
              Enter a value between 200 and {coins}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Withdraw Amount ($)</label>
          <input
            type="text"
            value={withdrawalAmount}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Payment System</label>
          <select
            {...register("paymentSystem")}
            className="select select-bordered w-full"
          >
            <option>Bkash</option>
            <option>Rocket</option>
            <option>Nagad</option>
            <option>Upay</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Account Number</label>
          <input
            type="text"
            inputMode="numeric"
            {...register("accountNumber", {
              required: "Account number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Account number must be numeric",
              },
            })}
            className="input input-bordered w-full"
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.accountNumber.message}
            </p>
          )}
        </div>
        <div>
          {coins < 200 ? (
            <p className="text-center text-red-500 mt-10">
              Insufficient coin. Minimum 200 coins required to withdraw.
            </p>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Submitting…" : "Withdraw"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Withdrawals;
