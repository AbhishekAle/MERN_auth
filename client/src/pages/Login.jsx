import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //getting inputed values
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  //fordwarding data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      //handling error
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(null);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
