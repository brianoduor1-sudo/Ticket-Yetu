import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Header from "./Components/Header";

import {
  useAuth,
} from "./context/AuthContext";

import MyTickets from "./Components/MyTickets";
import OrganiserTickets from "./Components/OrganiserTickets";


// Home
function Home() {
  const {
    user,
    profile,
    isAuthenticated,
  } = useAuth();

  return (
    <main>
      <h1>EventHub</h1>

      <p>
        Discover. Book. Attend.
      </p>

      {!isAuthenticated ? (
        <>
          <p>
            Discover events and book
            tickets with EventHub.
          </p>

          <Link to="/events">
            Explore Events
          </Link>
        </>
      ) : (
        <>
          <h2>
            Welcome{" "}
            {profile?.name ||
              user?.email}
          </h2>

          <p>
            Role:{" "}
            {profile?.role ||
              "attendee"}
          </p>

          <Link to="/events">
            Explore Events
          </Link>
        </>
      )}
    </main>
  );
}


// About
function About() {
  return (
    <main>
      <h1>
        About EventHub
      </h1>

      <p>
        Discover. Book. Attend.
      </p>
    </main>
  );
}


// Temporary placeholder for the
// team's events/API page.
//
// This will be replaced/connected
// when the API components are
// integrated.
function Events() {
  return (
    <main>
      <h1>
        Events
      </h1>

      <p>
        Events will be loaded from
        the connected events API.
      </p>
    </main>
  );
}


// Application
function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/my-tickets"
          element={
            <MyTickets />
          }
        />

        <Route
          path="/organiser/tickets"
          element={
            <OrganiserTickets />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="*"
          element={
            <main>
              <h1>
                Page Not Found
              </h1>

              <Link to="/">
                Back Home
              </Link>
            </main>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
