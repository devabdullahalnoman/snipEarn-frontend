import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useManageUsersAPI from "../../../api/useManageUsersAPI";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { getUsers, deleteUser, updateUserRole } = useManageUsersAPI();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      Swal.fire("Deleted", "User removed successfully", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  const roleMutation = useMutation({
    mutationFn: ({ email, role }) => updateUserRole(email, role),
    onSuccess: () => {
      Swal.fire("Updated", "User role updated successfully", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update user role", "error");
    },
  });

  const handleRoleChange = async (email, newRole, currentRole) => {
    if (newRole === currentRole) return;

    const confirm = await Swal.fire({
      title: "Change Role?",
      text: `Switch role from "${currentRole}" to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (confirm.isConfirmed) {
      roleMutation.mutate({ email, role: newRole });
    }
  };

  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: "Remove this user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(email);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load users</p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Coins</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="user"
                      />
                    </div>
                  </div>
                </td>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select select-sm min-w-20"
                    defaultValue={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.email, e.target.value, user.role)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="buyer">Buyer</option>
                    <option value="worker">Worker</option>
                  </select>
                </td>
                <td>{user.coins ?? 0}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="btn btn-sm btn-error"
                    disabled={deleteMutation.isLoading}
                  >
                    Remove
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

export default ManageUsers;
