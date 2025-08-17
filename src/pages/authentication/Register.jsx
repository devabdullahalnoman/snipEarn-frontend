import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useStoreUserAPI from "../../api/useStoreUserAPI";
import useImageUpload from "../../hooks/useImageUpload";
import GoogleAuthButton from "./GoogleAuthButton";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const { storeUserPromise } = useStoreUserAPI();
  const { uploadImage } = useImageUpload();

  const [uploadedProfileUrl, setUploadedProfileUrl] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      setUploadedProfileUrl(url);
    } catch (err) {
      alert("Profile picture upload failed", err);
    }
  };

  const onSubmit = (data) => {
    const { displayName, email, password, role } = data;

    createUser(email, password)
      .then(async () => {
        await updateUserProfile({ displayName, photoURL: uploadedProfileUrl });
        await storeUserPromise({
          displayName,
          email,
          photoURL: uploadedProfileUrl,
          role,
        });
        navigate(from);
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("email", {
            type: "manual",
            message: "Email already in use",
          });
        } else {
          alert(err.message);
        }
        setLoading(false);
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-4xl text-center">
            Registration
          </legend>
          <hr className="mt-5" />
          <GoogleAuthButton enableRoleModal={true}></GoogleAuthButton>

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-2xl">Name</legend>
            <input
              type="text"
              className="input rounded-lg w-full"
              placeholder="Enter your full name"
              {...register("displayName", { required: true })}
            />
          </fieldset>

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-2xl">Email</legend>
            <input
              type="email"
              className="input rounded-lg w-full"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </fieldset>

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-2xl">
              Profile Picture
            </legend>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleImageUpload}
            />
          </fieldset>

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-2xl">Password</legend>
            <input
              type="password"
              className="input rounded-lg w-full"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "Min 6 chars, include UPPER, lower & digit",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </fieldset>

          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-2xl">Role</legend>
            <select
              defaultValue=""
              className="select select-bordered w-full"
              {...register("role", { required: "Please select a Role" })}
            >
              <option value="" disabled>
                Pick a Role
              </option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <span className="text-red-500 mt-1">{errors.role.message}</span>
            )}
          </fieldset>

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Registering…" : "Register"}
            </button>
          </div>
        </fieldset>
      </form>
      <p className="mt-3">
        Already have an account? Login{" "}
        <Link to="/auth/login" className="hover:text-primary">
          HERE
        </Link>
      </p>
    </div>
  );
};

export default Register;
