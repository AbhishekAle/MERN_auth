import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogout = async () => {
    await fetch("/api/logout");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "gray",
        padding: "5px",
        marginBottom: "50px",
      }}
    >
      {isAuthenticated ? (
        <>
          <Link to={"/"}>Home</Link>
          <Link to={"/login"} onClick={handleLogout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to={"/"}>Home</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

{
  /* <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link> */
}
