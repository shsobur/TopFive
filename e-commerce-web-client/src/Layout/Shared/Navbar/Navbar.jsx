import { useContext, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // User logout__
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You went to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f70000",
      cancelButtonColor: "#007c01",
      confirmButtonText: "Yes, Log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Finished!",
            text: "Log out successfully",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/">TopFive</a>
          </div>

          <div className={`nav-menu ${isOpen ? "active" : ""}`}>
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/products" className="nav-link">
              Products
            </a>
            <a href="/my-carts" className="nav-link">
              My Carts
            </a>
            <a href="/add-products" className="nav-link">
              Add products
            </a>
            {user ? (
              <button onClick={handleSignOut} className="signin-btn">
                Sign Out
              </button>
            ) : (
              <NavLink to="/sign-in">
                <button className="signin-btn">Sign In</button>
              </NavLink>
            )}
          </div>

          <div className="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
