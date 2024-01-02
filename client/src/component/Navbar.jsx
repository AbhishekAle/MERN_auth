import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = async () => {
    await fetch("/api/logout");
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
      <>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"} onClick={handleLogout}>
          Logout
        </Link>

        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </>
    </div>
  );
};

export default Navbar;

{
  /* <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link> */
}
