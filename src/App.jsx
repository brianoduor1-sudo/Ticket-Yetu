import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import SportsPage from "./Components/SportsPage";
import EntertainmentPage from "./Components/EntertainmentPage";
import EventDetailsPage from "./Components/EventDetailsPage";
import Navigation from "./Components/Organizerpage/Navigation.jsx";
import Blog from "./Components/Organizerpage/Blog.jsx";
import Footer from "./Components/Organizerpage/Footer.jsx";
import Help from "./Components/Organizerpage/Help.jsx";
import Info from "./Components/Organizerpage/Info.jsx";
import Instructions from "./Components/Organizerpage/Instructions.jsx";
import Registration from "./Components/Organizerpage/registration.jsx";
import Login from "./Components/Organizerpage/Login.jsx";
import Sign from "./Components/Organizerpage/Sign.jsx";
import { BookingConfirmation } from "./Components/booking/BookingConfirmation.jsx";
import { TicketStub } from "./Components/booking/TicketStub.jsx";
import { PaymentPanel } from "./Components/booking/PaymentPanel.jsx";

function Layout({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #0f172a 45%, #020617 100%)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "16px" }}>🎟️ Ticket Yetu</h1>

      <p
        style={{
          maxWidth: "700px",
          fontSize: "1.1rem",
          lineHeight: 1.7,
          color: "#cbd5e1",
          marginBottom: "32px",
        }}
      >
        Discover and book the best sports, music, comedy, and festival events
        happening across Kenya.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate("/events/sports")}
          style={{
            padding: "16px 28px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "14px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "white",
            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
          }}
        >
          ⚽ Sports Events
        </button>

        <button
          onClick={() => navigate("/events/entertainment")}
          style={{
            padding: "16px 28px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "14px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #db2777, #be185d)",
            color: "white",
            boxShadow: "0 10px 25px rgba(219, 39, 119, 0.35)",
          }}
        >
          🎵 Entertainment
        </button>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        background: "radial-gradient(circle at top, #111827 0%, #020617 100%)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "12px" }}>404</h1>
      <p style={{ color: "#cbd5e1" }}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* Events section */}
        <Route
          path="/events/sports"
          element={
            <Layout>
              <SportsPage />
            </Layout>
          }
        />
        <Route
          path="/events/entertainment"
          element={
            <Layout>
              <EntertainmentPage />
            </Layout>
          }
        />
        <Route
          path="/events/:id"
          element={
            <Layout>
              <EventDetailsPage />
            </Layout>
          }
        />

        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/help"
          element={
            <Layout>
              <Help />
            </Layout>
          }
        />
        <Route
          path="/info"
          element={
            <Layout>
              <Info />
            </Layout>
          }
        />
        <Route
          path="/instructions"
          element={
            <Layout>
              <Instructions />
            </Layout>
          }
        />
        <Route
          path="/registration"
          element={
            <Layout>
              <Registration />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/sign"
          element={
            <Layout>
              <Sign />
            </Layout>
          }
        />
        <Route
          path="/bookingconfirmation"
          element={
            <Layout>
              <BookingConfirmation />
            </Layout>
          }
        />
        <Route
          path="/ticketstub"
          element={
            <Layout>
              <TicketStub />
            </Layout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
