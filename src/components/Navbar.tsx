import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ margin: "10px",color:'#6495ED' }}>Renters Dashboard</Link>
      <Link to="/investors" style={{ margin: "10px",color:'#6495ED'  }}>Investors Dashboard</Link>
    </nav>
  );
};

export default Navbar;
