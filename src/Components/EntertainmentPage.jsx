import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { fetchEntertainmentEvents } from "./services/ticketmaster";

export default function EntertainmentPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntertainmentEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, #4c1d95 0%, #111827 45%, #020617 100%)",
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
        🎵 Entertainment Events
      </h1>

      <p
        style={{
          color: "#d8b4fe",
          textAlign: "center",
          maxWidth: "760px",
          margin: "0 auto 32px",
          fontSize: "1.05rem",
          lineHeight: 1.7,
        }}
      >
        Discover concerts, festivals, comedy nights, and unforgettable
        entertainment experiences happening across Nairobi and beyond.
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
              color: "#d8b4fe",
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
              color: "#f5d0fe",
              padding: "48px 16px",
              border: "1px dashed #7c3aed",
              borderRadius: "24px",
              background: "rgba(15, 23, 42, 0.55)",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>
              No entertainment events available
            </h3>
            <p>Check back later for concerts, festivals, and comedy shows.</p>
          </div>
        )}
      </div>
    </div>
  );
}
