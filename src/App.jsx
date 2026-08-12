import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SportsPage from "./Components/SportsPage";
import EntertainmentPage from "./Components/EntertainmentPage";
import EventDetailsPage from "./Components/EventDetailsPage";

function Home() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top, #1e1b4b 0%, #0b1020 45%, #020617 100%)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px 60px",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            marginBottom: "16px",
          }}
        >
          🎫 TicketYetu EventHub
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            color: "#cbd5e1",
            fontSize: "1.15rem",
            lineHeight: 1.8,
          }}
        >
          Discover upcoming sports, music, comedy, festivals and nightlife
          events across Kenya. Book tickets and manage your attendance in one
          place.
        </p>
      </div>

      {/* Categories */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px 80px",
        }}
      >
        {/* Sports Card */}
        <div
          style={{
            background: "rgba(17,24,39,0.92)",
            borderRadius: "28px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
            backdropFilter: "blur(14px)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80"
            alt="Sports"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
            }}
          />

          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(79,70,229,0.2)",
                color: "#c4b5fd",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              SPORTS
            </div>

            <h2
              style={{
                fontSize: "2rem",
                margin: "0 0 12px",
                fontWeight: 800,
              }}
            >
              ⚽ Sports Events
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.7,
                marginBottom: "22px",
              }}
            >
              FKF Premier League, Rugby Sevens, National Super League,
              basketball and other major sporting events happening across Kenya.
            </p>

            <ul
              style={{
                color: "#e2e8f0",
                lineHeight: 1.9,
                paddingLeft: "18px",
                marginBottom: "24px",
              }}
            >
              <li>Gor Mahia vs AFC Leopards</li>
              <li>Kenya Rugby Sevens Invitational</li>
              <li>Nairobi City Thunder vs Ulinzi Warriors</li>
            </ul>

            <Link
              to="/sports"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                color: "white",
                padding: "14px 20px",
                borderRadius: "14px",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Browse Sports →
            </Link>
          </div>
        </div>

        {/* Entertainment Card */}
        <div
          style={{
            background: "rgba(17,24,39,0.92)",
            borderRadius: "28px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
            backdropFilter: "blur(14px)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80"
            alt="Entertainment"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
            }}
          />

          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(236,72,153,0.18)",
                color: "#f9a8d4",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              ENTERTAINMENT
            </div>

            <h2
              style={{
                fontSize: "2rem",
                margin: "0 0 12px",
                fontWeight: 800,
              }}
            >
              🎵 Entertainment
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.7,
                marginBottom: "22px",
              }}
            >
              Music concerts, comedy shows, festivals, parties and nightlife
              experiences from Nairobi and across the country.
            </p>

            <ul
              style={{
                color: "#e2e8f0",
                lineHeight: 1.9,
                paddingLeft: "18px",
                marginBottom: "24px",
              }}
            >
              <li>Sauti Sol Reunion Concert</li>
              <li>Nairobi Afrobeat Festival</li>
              <li>Churchill Comedy Night</li>
            </ul>

            <Link
              to="/entertainment"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                color: "white",
                padding: "14px 20px",
                borderRadius: "14px",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Browse Entertainment →
            </Link>
          </div>
        </div>
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
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
