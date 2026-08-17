import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { fetchSportsEvents } from "./services/ticketmaster";

export default function SportsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSportsEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, #1e1b4b 0%, #0b1020 40%, #020617 100%)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "800",
          marginBottom: "12px",
        }}
      >
        🏆 Sports Events
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          textAlign: "center",
          maxWidth: "720px",
          margin: "0 auto 32px",
          fontSize: "1.05rem",
          lineHeight: 1.7,
        }}
      >
        Explore upcoming football matches, rugby tournaments, basketball games,
        and other exciting sporting events happening across Kenya.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <p
            style={{
              color: "#cbd5e1",
              gridColumn: "1 / -1",
              textAlign: "center",
            }}
          >
            Loading events...
          </p>
        ) : error ? (
          <p
            style={{
              color: "#fca5a5",
              gridColumn: "1 / -1",
              textAlign: "center",
            }}
          >
            Failed to load events: {error}
          </p>
        ) : events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#e2e8f0",
              padding: "48px 16px",
              border: "1px dashed #475569",
              borderRadius: "24px",
              background: "rgba(15, 23, 42, 0.55)",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>No sports events available</h3>
            <p>Check back later for upcoming fixtures and tournaments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
