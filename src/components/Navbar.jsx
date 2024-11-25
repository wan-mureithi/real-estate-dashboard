import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ margin: "10px" }}>Renters Dashboard</Link>
      <Link to="/investors" style={{ margin: "10px" }}>Investors Dashboard</Link>
    </nav>
  );
};

export default Navbar;
