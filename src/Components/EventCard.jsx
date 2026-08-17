import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const image =
    event.images?.find((img) => img.ratio === "16_9")?.url ||
    event.images?.[0]?.url;

  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;
  const venue = event._embedded?.venues?.[0]?.name;
  const city = event._embedded?.venues?.[0]?.city?.name;

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #334155",
        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {image && (
        <img
          src={image}
          alt={event.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      <div style={{ padding: "16px" }}>
        <span
          style={{
            fontSize: "12px",
            color: "#a78bfa",
            textTransform: "uppercase",
            fontWeight: "700",
          }}
        >
          {event.classifications?.[0]?.segment?.name || "Event"}
        </span>

        <h3
          style={{
            color: "white",
            fontSize: "18px",
            margin: "8px 0 12px",
            lineHeight: 1.4,
          }}
        >
          {event.name}
        </h3>

        <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "6px 0" }}>
          📅 {date || "Date TBA"}
        </p>

        <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "6px 0" }}>
          ⏰ {time || "Time TBA"}
        </p>

        <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "6px 0 14px" }}>
          📍 {[venue, city].filter(Boolean).join(", ")}
        </p>

        <Link
          to={`/events/${event.id}`}
          style={{
            display: "inline-block",
            padding: "10px 16px",
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: "white",
            borderRadius: "10px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          View Event
        </Link>
      </div>
    </div>
  );
}
