import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Book-Ur-Tour</span>
        </Link>
        <div className="navbarItems">
          {user ? <span className="userName">{"Hi " + user.userName} </span> : <>
            <button className="navBtn">Register</button>
            <Link to={"/login"}><button className="navBtn">Sign in</button></Link>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
