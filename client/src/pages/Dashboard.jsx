import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { username } = useSelector((state) => state.user);
  const userName = username.toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to your Dashboard,{" "}
          <span style={{ color: "red" }}>"{userName}"</span>
        </h1>
        <p className="text-gray-700">
          You have successfully logged in. This is your dashboard content.
        </p>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;
