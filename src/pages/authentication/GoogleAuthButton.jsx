import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { FaGoogle } from "react-icons/fa";

const GoogleAuthButton = ({ enableRoleModal = false }) => {
  const { signInWithGoogle, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const useAxiosInstance = useAxios;

  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        const userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        if (enableRoleModal) {
          setUserInfo(userData);
          setShowModal(true);
        } else {
          navigate(from);
        }
      })
      .catch((error) => {
        alert("Google sign-in failed.", error);
        setLoading(false);
      });
  };

  const handleRoleSubmit = async () => {
    if (!selectedRole || !userInfo) {
      alert("Please select a role");
      return;
    }

    const payload = { ...userInfo, role: selectedRole };

    try {
      await useAxiosInstance.post("/users", payload);
      setShowModal(false);
      navigate(from);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("User already exists. Redirecting...");
        setShowModal(false);
        navigate("/auth/login");
      } else {
        alert("Failed to save user. Try again.");
      }
    }
  };

  return (
    <>
      <button
        className="btn btn-outline w-full mt-4 bg-white text-black text-lg"
        onClick={handleGoogleSignIn}
      >
        <FaGoogle />
        Sign in with Google
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg mb-4 text-center">
              Choose Your Role
            </h3>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select a role</option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
            <button
              onClick={handleRoleSubmit}
              className="btn btn-primary w-full mt-4"
              disabled={!selectedRole}
            >
              Confirm Role
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default GoogleAuthButton;
