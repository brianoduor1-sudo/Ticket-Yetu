import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotificationBell } from "../Notifications/NotificationBell.jsx";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  };

  return (
    <nav className="navigation">
      <div className="logo-section">
        <img src="/logo.png" alt="TicketYetu logo" />
        <h1>TicketYetu</h1>
      </div>

      <div className="nav-links">
        <Link to="/events/">Events</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/info">info</Link>
        <Link to="/instructions">instructions</Link>
        <Link to="registration">registration</Link>
        <Link to="/my-tickets">My Tickets</Link>
      </div>

      <div className="nav-actions">
        <Link to="/help">Help</Link>
        <NotificationBell />

        {loggedInUser ? (
          <>
            <span className="welcome-text">
              Welcome, {loggedInUser.contactName}
            </span>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">↪ Login</Link>
            <button className="btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;