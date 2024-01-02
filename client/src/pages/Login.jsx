import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, setUsername } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      const data = await res.json();

      dispatch(setToken(data.token));
      dispatch(setUsername(data.username));
      setError(data.message);
      if (res.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <label className="block text-sm mb-2 text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />

        <label className="block text-sm mb-2 text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            value={password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 pr-10"
          />
          <button
            className="absolute top-0 right-0 mt-3 mr-4"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>
        <h1 className="text-xl text-gray-700">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Register
          </button>
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="submit"
        >
          {loading ? "Loading" : "Login"}
        </button>
      </form>
      {error && (
        <h1 className="text-red-500 transition-opacity duration-500">
          {error}
        </h1>
      )}
    </div>
  );
};

export default Login;
