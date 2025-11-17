import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css"; // import the css file

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-logo">
          CarPoolX
        </Link>

        {/* Menu Links */}
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/search" className="navbar-link">
              Search Rides
            </Link>
          </li>
          <li>
            <Link to="/create-ride" className="navbar-link">
              Create Ride
            </Link>
          </li>
          

          {user ? (
            <li>
              <button className="navbar-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register" className="navbar-link navbar-linkregister">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="navbar-link navbar-linkregister">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
