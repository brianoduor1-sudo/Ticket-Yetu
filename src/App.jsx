import {
  useState,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Header from "./Components/Header";
import EventCard from "./Components/EventCard";
import SportsCard from "./Components/SportsCard";
import BookingForm from "./Components/BookingForm";
import MyTickets from "./Components/MyTickets";
import OrganiserTickets from "./Components/OrganiserTickets";

import {
  useAuth,
} from "./context/AuthContext";

import {
  loginUser,
  loginWithGoogle,
  registerUser,
} from "./services/authService";

import {
  createUserProfile,
} from "./services/userService";

import {
  requestOrganiser,
} from "./services/organiserService";


const testEvents = [
  {
    id: "event-1",
    title: "Nairobi Music Festival",
    category: "Music",
    description:
      "A live music experience featuring local artists and performers.",
    date: "24 August 2026",
    location: "Nairobi",
    price: 1500,
  },

  {
    id: "event-2",
    title: "Tech & Innovation Summit",
    category: "Academic",
    description:
      "A gathering for students, developers and technology enthusiasts.",
    date: "30 August 2026",
    location: "Westlands, Nairobi",
    price: 500,
  },

  {
    id: "event-3",
    title: "Campus Football Tournament",
    category: "Sports",
    description:
      "An exciting football tournament featuring university teams.",
    date: "5 September 2026",
    location: "Kasarani",
    price: 300,
  },
];


function Home() {
  const {
    user,
    profile,
    isAuthenticated,
  } = useAuth();

  return (
    <main>

      <h1>
        EventHub
      </h1>

      <p>
        Discover. Book. Attend.
      </p>

      {!isAuthenticated ? (
        <>
          <p>
            Discover events without
            creating an account.
          </p>

          <Link to="/events">
            <button type="button">
              Explore Events
            </button>
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
            {profile?.role}
          </p>

          <p>
            Organiser status:{" "}
            {profile?.organiserStatus}
          </p>

          <Link to="/events">
            <button type="button">
              Explore Events
            </button>
          </Link>
        </>
      )}

      <section>

        <h2>
          Featured Events
        </h2>

        {testEvents
          .slice(0, 2)
          .map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}

      </section>

    </main>
  );
}


function Events() {
  return (
    <main>

      <h1>
        Upcoming Events
      </h1>

      {testEvents.map(
        (event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        )
      )}

    </main>
  );
}


function Sports() {
  const sportsEvents =
    testEvents.filter(
      (event) =>
        event.category ===
        "Sports"
    );

  return (
    <main>

      <h1>
        Sports Events
      </h1>

      {sportsEvents.map(
        (event) => (
          <SportsCard
            key={event.id}
            event={event}
          />
        )
      )}

    </main>
  );
}


function EventDetails() {
  const { eventId } =
    useParams();

  const event =
    testEvents.find(
      (item) =>
        item.id === eventId
    );

  if (!event) {
    return (
      <main>
        <h1>
          Event Not Found
        </h1>

        <Link to="/events">
          Back to Events
        </Link>
      </main>
    );
  }

  return (
    <main>

      <Link to="/events">
        ← Back to Events
      </Link>

      <h1>
        {event.title}
      </h1>

      <p>
        {event.description}
      </p>

      <p>
        Category:{" "}
        {event.category}
      </p>

      <p>
        Date:{" "}
        {event.date}
      </p>

      <p>
        Location:{" "}
        {event.location}
      </p>

      <p>
        Ticket price: KSh{" "}
        {event.price}
      </p>

      <BookingForm
        event={event}
      />

    </main>
  );
}


function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const handleLogin =
    async (event) => {
      event.preventDefault();

      setError("");
      setLoading(true);

      try {
        await loginUser(
          email,
          password
        );

        navigate("/");
      } catch (error) {
        console.error(error);

        setError(
          error.message ||
            "Login failed."
        );
      } finally {
        setLoading(false);
      }
    };

  const handleGoogleLogin =
    async () => {
      setError("");
      setLoading(true);

      try {
        await loginWithGoogle();

        navigate("/");
      } catch (error) {
        console.error(error);

        setError(
          error.message ||
            "Google login failed."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main>

      <h1>
        Log In
      </h1>

      {error && (
        <p>
          {error}
        </p>
      )}

      <form
        onSubmit={handleLogin}
      >

        <label>
          Email

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            required
          />
        </label>

        <label>
          Password

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Log In"}
        </button>

      </form>

      <button
        type="button"
        onClick={
          handleGoogleLogin
        }
        disabled={loading}
      >
        Continue with Google
      </button>

      <p>
        Don't have an account?
      </p>

      <Link to="/register">
        Create Account
      </Link>

    </main>
  );
}


function Register() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const handleRegister =
    async (event) => {
      event.preventDefault();

      setError("");
      setLoading(true);

      try {
        const user =
          await registerUser(
            email,
            password
          );

        await createUserProfile(
          user,
          name
        );

        navigate("/");
      } catch (error) {
        console.error(error);

        setError(
          error.message ||
            "Registration failed."
        );
      } finally {
        setLoading(false);
      }
    };

  const handleGoogleRegister =
    async () => {
      setError("");
      setLoading(true);

      try {
        const user =
          await loginWithGoogle();

        await createUserProfile(
          user
        );

        navigate("/");
      } catch (error) {
        console.error(error);

        setError(
          error.message ||
            "Google registration failed."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main>

      <h1>
        Create Account
      </h1>

      {error && (
        <p>
          {error}
        </p>
      )}

      <form
        onSubmit={
          handleRegister
        }
      >

        <label>
          Name

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            required
          />
        </label>

        <label>
          Email

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            required
          />
        </label>

        <label>
          Password

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      <button
        type="button"
        onClick={
          handleGoogleRegister
        }
        disabled={loading}
      >
        Continue with Google
      </button>

      <p>
        Already have an account?
      </p>

      <Link to="/login">
        Log In
      </Link>

    </main>
  );
}


function OrganiserRequest() {
  const {
    user,
    profile,
    organiserPending,
    isOrganiser,
  } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleRequest =
    async () => {
      if (!user) {
        setError(
          "You must be logged in."
        );

        return;
      }

      try {
        setLoading(true);
        setError("");
        setMessage("");

        await requestOrganiser(
          user.uid
        );

        setMessage(
          "Your organiser request has been submitted."
        );
      } catch (error) {
        console.error(error);

        setError(
          error.message ||
            "Unable to submit request."
        );
      } finally {
        setLoading(false);
      }
    };

  if (isOrganiser) {
    return (
      <main>
        <h1>
          Organiser
        </h1>

        <p>
          Your organiser account
          has been approved.
        </p>
      </main>
    );
  }

  if (organiserPending) {
    return (
      <main>
        <h1>
          Organiser Request
        </h1>

        <p>
          Your request is currently
          pending approval.
        </p>
      </main>
    );
  }

  return (
    <main>

      <h1>
        Become an Organiser
      </h1>

      <p>
        Request organiser access
        to create and manage events.
      </p>

      {error && (
        <p>
          {error}
        </p>
      )}

      {message && (
        <p>
          {message}
        </p>
      )}

      <button
        type="button"
        onClick={
          handleRequest
        }
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Request Organiser Access"}
      </button>

    </main>
  );
}




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
          path="/events/:eventId"
          element={
            <EventDetails />
          }
        />

        <Route
          path="/sports"
          element={<Sports />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/organiser"
          element={
            <OrganiserRequest />
          }
        />

        <Route
          path="/organiser/tickets"
          element={
            <OrganiserTickets />
          }
        />

        <Route
          path="/my-tickets"
          element={
            <MyTickets />
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