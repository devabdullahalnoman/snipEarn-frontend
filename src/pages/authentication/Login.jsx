import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleAuthButton from "./GoogleAuthButton";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { signIn, loading, setLoading } = useAuth();

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(() => {
        navigate(from);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setError("email", {
            type: "manual",
            message: "User not found",
          });
        } else if (err.code === "auth/wrong-password") {
          setError("password", {
            type: "manual",
            message: "Incorrect password",
          });
        } else {
          alert(err.message);
        }
        setLoading(false);
      });
  };

  const emailPattern = /\S+@\S+\.\S+/;

  return (
    <div className="w-11/12 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-4xl text-center">
            Login
          </legend>
          <GoogleAuthButton></GoogleAuthButton>
          <hr className="mt-5" />

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-2xl">Email</legend>
            <input
              type="email"
              className="input rounded-lg w-full"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailPattern,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </fieldset>

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-2xl">Password</legend>
            <input
              type="password"
              className="input rounded-lg w-full"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </fieldset>

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>
        </fieldset>
      </form>
      <p className="mt-3">
        New to the site? Register{" "}
        <Link to="/auth/register" className="hover:text-primary">
          HERE
        </Link>
      </p>
    </div>
  );
};

export default Login;
