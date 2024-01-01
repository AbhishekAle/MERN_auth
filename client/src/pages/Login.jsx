import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        body: JSON.stringify(email, password),
      });
      setLoading(false);
      navigate("/dashboard");
      window.location.reload();
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            value={password}
          />
          <button>{loading ? "loading" : "Login"}</button>
        </form>
      </div>
    </>
  );
};

export default Login;
