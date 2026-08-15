import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css"; // ← add this

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
        <Link to="/promoters">Organizers</Link>
        <Link to="/blog">Blog</Link>
      </div>

      <div className="nav-actions">
        <Link to="/help">Help</Link>

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