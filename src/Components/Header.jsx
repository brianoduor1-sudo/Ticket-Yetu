import { Link } from "react-router-dom";

import { logoutUser } from "../services/authService";

import { useAuth } from "../context/AuthContext";

function Header() {
  const {
    user,
    profile,
    loading,
    isAuthenticated,
    isOrganiser,
    organiserPending,
  } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  if (loading) {
    return (
      <header className="header">
        <div className="header-container">
          <Link
            to="/"
            className="logo"
          >
            EventHub
          </Link>

          <span>Loading...</span>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-container">

        <Link
          to="/"
          className="logo"
        >
          EventHub
        </Link>

        <nav className="nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/events">
            Events
          </Link>

          <Link to="/sports">
            Sports
          </Link>

          <Link to="/about">
            About
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/my-tickets">
                My Tickets
              </Link>

              {/* Attendee who has not requested organiser access */}
              {profile?.role === "attendee" &&
                profile?.organiserStatus === "none" && (
                  <Link to="/organiser">
                    Become an Organiser
                  </Link>
                )}

              {/* Attendee whose organiser request is pending */}
              {organiserPending && (
                <span>
                  Organiser Request Pending
                </span>
              )}

              {/* Approved organiser */}
              {isOrganiser && (
                <>
                  <Link to="/organiser">
                    Organiser Dashboard
                  </Link>

                  <Link to="/organiser/tickets">
                    Manage Tickets
                  </Link>
                </>
              )}

              <span>
                {profile?.name ||
                  user?.email}
              </span>

              <button
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Log In
              </Link>

              <Link to="/register">
                <button type="button">
                  Create Account
                </button>
              </Link>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Header;
