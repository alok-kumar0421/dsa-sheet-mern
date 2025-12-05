import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2>DSA Sheet</h2>
      </Link>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>Hi, {user.name}</span>
            <button onClick={onLogout}>Sign Out</button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
