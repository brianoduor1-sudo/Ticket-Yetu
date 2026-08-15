import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchEventById } from "./services/ticketmaster";
import { eventService } from "./services/eventService";
import { BookingForm } from "./booking/BookingForm";
import EventLocationPin from "../components/EventLocationPin.jsx";
import EventMap from "../components/EventMap.jsx";

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(false);               

  useEffect(() => {
    fetchEventById(id)
      .then(setEvent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={pageWrapStyle}>
        <p style={{ color: "#cbd5e1" }}>Loading event...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={pageWrapStyle}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
          Event not found
        </h1>
        <p style={{ color: "#cbd5e1", marginBottom: "24px" }}>
          {error || "We couldn't find an event with that ID."}
        </p>
        <button onClick={() => navigate("/")} style={backButtonStyle}>
          Back to Home
        </button>
      </div>
    );
  }

  const image =
    event.images?.find((img) => img.width >= 640)?.url ||
    event.images?.[0]?.url;

  const venue = event._embedded?.venues?.[0];
  const segment = event.classifications?.[0]?.segment?.name;
  const isSports = segment === "Sports";
  const accent = isSports ? "#2563eb" : "#db2777";
  const backLink = isSports ? "/events/sports" : "/events/entertainment";

  // Build a { address, lat, lng } object from Ticketmaster's venue data,
  // matching what EventLocationPin / EventMap expect. Ticketmaster returns
  // lat/lng as strings, so parseFloat them. If the venue has no coordinates
  // at all, location stays null and both components fall back gracefully
  // (EventLocationPin renders nothing, EventMap shows a "no location" message).
  const location = venue?.location
    ? {
        address: `${venue.name}${venue.city?.name ? ", " + venue.city.name : ""}`,
        lat: parseFloat(venue.location.latitude),
        lng: parseFloat(venue.location.longitude),
      }
    : null;

  return (
    <div
      style={{
        padding: "40px 20px",
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a 0%, #020617 100%)",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link
          to={backLink}
          style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem" }}
        >
          ← Back to {isSports ? "Sports" : "Entertainment"}
        </Link>

        {/* Pin + address link, jumps down to the map section below via
            id="event-location" — only renders if location.address exists */}
        <div style={{ marginTop: "12px" }}>
          <EventLocationPin location={location} />
        </div>

        <div
          style={{
            marginTop: "20px",
            borderRadius: "20px",
            overflow: "hidden",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        >
          {image && (
            <img
              src={image}
              alt={event.name}
              style={{ width: "100%", maxHeight: "380px", objectFit: "cover" }}
            />
          )}

          <div style={{ padding: "28px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: "999px",
                background: accent,
                fontSize: "0.85rem",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              {segment || "Event"}
            </span>

            <h1 style={{ fontSize: "2.4rem", marginBottom: "16px" }}>
              {event.name}
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "24px",
                color: "#cbd5e1",
              }}
            >
              <p>📅 {event.dates?.start?.localDate}</p>
              <p>⏰ {event.dates?.start?.localTime || "TBA"}</p>
              <p>
                📍 {venue?.name}
                {venue?.city?.name ? `, ${venue.city.name}` : ""}
              </p>
              <p>
                🎟️{" "}
                {event.dates?.status?.code === "onsale"
                  ? "Tickets Available"
                  : "Check availability"}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(148, 163, 184, 0.2)",
              }}
            >
              <span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                {event.priceRanges?.[0]
                  ? `KES ${event.priceRanges[0].min} - ${event.priceRanges[0].max}`
                  : "Price not available"}
              </span>

              {/* ↓↓↓ REPLACED the old <a href={event.url}> external link ↓↓↓ */}
              {booking ? (
                <div style={{ width: "100%", marginTop: 16 }}>
                  <BookingForm event={eventService.getOrCreateFromTicketmaster(event)} />
                </div>
              ) : (
                <button
                  onClick={() => setBooking(true)}
                  style={{
                    padding: "14px 32px",
                    borderRadius: "12px",
                    border: "none",
                    background: accent,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Book Ticket
                </button>
              )}
              {/* ↑↑↑ END REPLACEMENT ↑↑↑ */}
            </div>
          </div>
        </div>

        {/* Map section — id="event-location" is the scroll target for the
            pin link above. Shows "no location set" message if the venue
            didn't have coordinates. */}
        <EventMap location={location} />
      </div>
    </div>
  );
}

const pageWrapStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at top, #111827 0%, #020617 100%)",
  color: "white",
  textAlign: "center",
};

const backButtonStyle = {
  padding: "12px 24px",
  borderRadius: "10px",
  border: "none",
  background: "#7c3aed",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};