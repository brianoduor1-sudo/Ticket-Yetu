import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const image =
    event.images?.find((img) => img.width >= 640)?.url ||
    event.images?.[0]?.url;

  const venue = event._embedded?.venues?.[0];

  return (
    <div className="card">
      <img src={image} alt={event.name} className="card-image" />

      <div className="card-body">
        <span className="badge">
          {event.classifications?.[0]?.segment?.name || "Event"}
        </span>

        <h3>{event.name}</h3>

        <p>📅 {event.dates?.start?.localDate}</p>
        <p>⏰ {event.dates?.start?.localTime || "TBA"}</p>
        <p>
          📍 {venue?.name}, {venue?.city?.name}
        </p>

        <p>
          💰{" "}
          {event.priceRanges?.[0]
            ? `KES ${event.priceRanges[0].min} - ${event.priceRanges[0].max}`
            : "Price not available"}
        </p>

        <p>
          🎟️{" "}
          {event.dates?.status?.code === "onsale"
            ? "Tickets Available"
            : "Check availability"}
        </p>

        <Link to={`/events/${event.id}`} className="btn">
          View Event
        </Link>
      </div>
    </div>
  );
}
