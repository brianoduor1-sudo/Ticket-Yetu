import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import EventPage from "./Components/EventPage";
import EventDetailsPage from "./Components/EventDetailsPage";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b1020",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
        🎫 TicketYetu EventHub
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          maxWidth: "700px",
          lineHeight: 1.7,
          color: "#cbd5e1",
        }}
      >
        Discover upcoming music concerts, comedy shows, parties, rugby sevens,
        FKF Premier League, NSL, and basketball events across Kenya.
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/events"
          style={{
            background: "#4f46e5",
            color: "white",
            padding: "14px 26px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          Browse Events
        </Link>

        <a
          href="#sports"
          style={{
            border: "1px solid #475569",
            color: "white",
            padding: "14px 26px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          Sports
        </a>
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b1020",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
        404 - Page Not Found
      </h2>
      <p style={{ color: "#cbd5e1", marginBottom: "24px" }}>
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        style={{
          background: "#4f46e5",
          color: "white",
          padding: "12px 22px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        color: "#cbd5e1",
        padding: "18px",
        textAlign: "center",
        fontSize: "0.95rem",
      }}
    >
      © 2026 TicketYetu EventHub — Discover • Book • Attend
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
