import React, { useState } from "react";

const Register = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      alert("registered successfully ");

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
            autoComplete="username"
          />
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
          <button>Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
