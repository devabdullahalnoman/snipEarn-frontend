import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import { PiCoinVerticalDuotone } from "react-icons/pi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { coins } = useUserRole();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "cupcake"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      alert("Logout failed:", error);
    }
  };

  const navLinks = (
    <div className="lg:flex items-center">
      <li>
        <label className="flex cursor-pointer gap-2 text-lg">
          Theme
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            className="toggle theme-controller text-base-content"
            onChange={(e) => {
              const newTheme = e.target.checked ? "dark" : "cupcake";
              document.documentElement.setAttribute("data-theme", newTheme);
              localStorage.setItem("theme", newTheme);
              setTheme(newTheme);
            }}
            checked={theme === "dark"}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </li>
      <li>
        <NavLink
          to="https://github.com/devabdullahalnoman/snipEarn-frontend"
          className="py-2 mr-2 lg:py-1.5 text-base lg:text-lg font-medium"
        >
          Join As Developer
        </NavLink>
      </li>
      {user ? (
        <>
          <li className="mr-3 pb-2 lg:pb-0">
            <NavLink
              to="/dashboard"
              className="text-base lg:text-lg font-medium"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="flex flex-row-reverse justify-end lg:flex-row items-center pb-2 lg:pb-0">
            <div className="badge text-lg">
              <p className="flex items-center gap-1">
                <span>
                  <PiCoinVerticalDuotone size={22} />
                </span>{" "}
                <span className="text-xl">{coins}</span>
              </p>
            </div>
          </li>
          <div className="avatar mr-3">
            <div className="w-11 rounded-full">
              <img src={user.photoURL} />
            </div>
          </div>
          <li>
            <button
              onClick={handleLogOut}
              className="btn btn-sm lg:btn-md btn-primary text-base"
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <div className="flex flex-col lg:flex-row gap-3">
          <li>
            <Link
              to="auth/register"
              className="btn btn-sm lg:btn-md btn-primary w-full text-base"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="auth/login"
              className="btn btn-sm lg:btn-md btn-primary w-full text-base"
            >
              Login
            </Link>
          </li>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-base-300 shadow-sm">
      <div className="navbar lg:w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden pl-1.5"
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="text-3xl lg:text-5xl font-extrabold py-4 px-2 lg:px-0"
          >
            snipEarn
          </Link>
        </div>
        <div className="navbar-end gap-3 hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
