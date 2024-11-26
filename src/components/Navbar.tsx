import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", display:'flex', justifyContent:'space-between' }}>
      <div>
      <Link to="/" style={{ margin: "10px" }}>Renters Dashboard</Link>
      <Link to="/investors" style={{ margin: "10px" }}>Investors Dashboard</Link>
      </div>
      
    </nav>
  );
};

export default Navbar;
