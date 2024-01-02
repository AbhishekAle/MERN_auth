import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../slices/userSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await fetch("/api/logout");
    dispatch(setToken(null));
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">
          Home
        </Link>

        <div className="flex space-x-4">
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
