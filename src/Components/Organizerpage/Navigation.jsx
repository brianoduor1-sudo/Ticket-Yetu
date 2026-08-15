import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css"; 

function Navigation() {
  const navigate = useNavigate();
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
        <Link to="/organizer">Organizers</Link>
        <Link to="/instructions">instructions</Link>
        <Link to="registration">registration</Link>
      </div>

      <div className="nav-actions">
        <Link to="/help">Help</Link>
        <Link to="/login">↪ Login</Link>
        <button className="btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
