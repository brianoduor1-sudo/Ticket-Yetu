import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { logout } from "./services/authService";

import Register from "./pages/Register";
import Login from "./pages/Login";
import OrganiserRequest from "./pages/OrganiserRequest";

function App() {
  const { user, profile, loading } = useAuth();

  const [page, setPage] = useState("home");

  if (loading) {
    return <p>Loading...</p>;
  }

  // =========================
  // LOGGED OUT
  // =========================

  if (!user) {
    return (
      <div>
        <h1>EventHub</h1>

        <p>Discover. Book. Attend.</p>

        <hr />

        <button onClick={() => setPage("home")}>
          Home
        </button>

        <button onClick={() => setPage("login")}>
          Login
        </button>

        <button onClick={() => setPage("register")}>
          Create Account
        </button>

        <hr />

        {page === "home" && (
          <div>
            <h2>Welcome to EventHub</h2>

            <p>
              Discover events, book tickets and manage
              your event participation.
            </p>

            <button onClick={() => setPage("login")}>
              Login
            </button>

            <button onClick={() => setPage("register")}>
              Create Account
            </button>
          </div>
        )}

        {page === "login" && (
          <Login />
        )}

        {page === "register" && (
          <Register
            onLogin={() => setPage("login")}
          />
        )}
      </div>
    );
  }

  // =========================
  // LOGGED IN
  // =========================

  return (
    <div>
      <h1>EventHub</h1>

      <p>Discover. Book. Attend.</p>

      <hr />

      <button onClick={() => setPage("home")}>
        Home
      </button>

      <button onClick={() => setPage("organiser")}>
        Become an Organiser
      </button>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      {page === "home" && (
        <div>
          <h2>
            Welcome, {profile?.name || user.email}
          </h2>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {profile?.role}
          </p>

          <p>
            <strong>Organiser Status:</strong>{" "}
            {profile?.organiserStatus}
          </p>
        </div>
      )}

      {page === "organiser" && (
        <OrganiserRequest />
      )}
    </div>
  );
}

export default App;
