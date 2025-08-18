import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaTasks,
  FaCheckCircle,
  FaWallet,
  FaPlusCircle,
  FaListAlt,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import { PiCoinVerticalDuotone } from "react-icons/pi";
import NotificationDrawer from "./NotificationDrawer";
import Footer from "../shared/Footer";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, coins, loading } = useUserRole();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      alert("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl">Loading dashboard…</span>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-base-200 shadow-sm">
        <div className="navbar xl:w-11/12 mx-auto lg:px-0">
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost"
                aria-label="Open sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <Link
              to="/"
              className="btn btn-ghost text-3xl lg:text-5xl py-8 my-0.5 lg:py-9.5"
            >
              snipEarn
            </Link>
          </div>
          <div className="navbar-end gap-3">
            <div className="sm:flex gap-3 hidden">
              <div className="flex flex-col gap-3 my-1 items-center">
                <div className="badge badge-primary text-lg">
                  <p className="flex items-center gap-1">
                    <span>
                      <PiCoinVerticalDuotone size={22} />
                    </span>{" "}
                    <span>{coins}</span>
                  </p>
                </div>
                <div className="badge badge-accent capitalize text-base font-bold">
                  {role}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <div className="avatar">
                    <div className="w-12 md:w-10 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">{user?.displayName}</div>
              </div>
            </div>
            <div>
              <NotificationDrawer userEmail={user?.email} />
            </div>
          </div>
        </div>
      </div>
      <div className="drawer lg:drawer-open xl:w-11/12 mx-auto">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
        <div className="drawer-side lg:h-[70vh]">
          <label
            htmlFor="dashboard-drawer"
            className="drawer-overlay bg-base-200"
            aria-label="Close sidebar"
          />

          <ul className="menu p-4 w-64 bg-base-200 text-base-content text-lg font-semibold space-y-2">
            <li className="mb-4 lg:hidden">
              <NavLink to="/" className="text-3xl lg:text-5xl font-extrabold">
                snipEarn
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FaHome className="inline-block mr-2" />
                Site Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">
                <FaWallet className="inline-block mr-2" />
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">
                <FaHome className="inline-block mr-2" />
                Dashboard Home
              </NavLink>
            </li>
            {role === "worker" && (
              <>
                <li>
                  <NavLink to="/dashboard/worker/task-list">
                    <FaTasks className="inline-block mr-2" />
                    Task List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/worker/my-submissions">
                    <FaCheckCircle className="inline-block mr-2" />
                    My Submissions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/worker/withdrawals">
                    <FaWallet className="inline-block mr-2" />
                    Withdrawals
                  </NavLink>
                </li>
              </>
            )}
            {role === "buyer" && (
              <>
                <li>
                  <NavLink to="/dashboard/buyer/add-task">
                    <FaPlusCircle className="inline-block mr-2" />
                    Add New Task
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/buyer/my-tasks">
                    <FaListAlt className="inline-block mr-2" />
                    My Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/buyer/purchase-coin">
                    <FaDollarSign className="inline-block mr-2" />
                    Purchase Coin
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/buyer/payments">
                    <FaWallet className="inline-block mr-2" />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            {role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/admin/manage-users">
                    <FaUsers className="inline-block mr-2" />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/manage-tasks">
                    <FaTasks className="inline-block mr-2" />
                    Manage Tasks
                  </NavLink>
                </li>
              </>
            )}
            <li className="sm:hidden">
              <div className="flex gap-3">
                <div className="flex flex-col gap-3 my-1 items-center">
                  <div className="badge badge-primary text-lg">
                    <p className="flex items-center gap-1">
                      <span>
                        <PiCoinVerticalDuotone size={22} />
                      </span>{" "}
                      <span>{coins}</span>
                    </p>
                  </div>
                  <div className="badge badge-accent capitalize text-base font-bold">
                    {role}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <div className="avatar">
                      <div className="w-12 md:w-10 rounded-full">
                        <img src={user.photoURL} />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">{user?.displayName}</div>
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="btn btn-sm lg:btn-md btn-primary text-base"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
