import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../Api/ticketmaster";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getEventById(id);
      setEvent(data);
    }

    load();
  }, [id]);

  if (!event) return <p>Loading event...</p>;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;

  return (
    <div className="details-container">
      <img src={image} alt={event.name} className="details-image" />

      <div className="details-content">
        <span className="badge">
          {event.classifications?.[0]?.segment?.name}
        </span>

        <h1>{event.name}</h1>

        <p className="description">
          {event.info ||
            event.pleaseNote ||
            "Join us for an unforgettable event experience."}
        </p>

        <div className="info-grid">
          <Info label="Date" value={event.dates?.start?.localDate} />
          <Info label="Time" value={event.dates?.start?.localTime || "TBA"} />
          <Info label="Venue" value={venue?.name} />
          <Info
            label="Location"
            value={`${venue?.city?.name}, ${venue?.country?.name}`}
          />
          <Info
            label="Category"
            value={event.classifications?.[0]?.genre?.name}
          />
          <Info
            label="Organiser"
            value={event.promoter?.name || "Event Organiser"}
          />
          <Info
            label="Ticket Price"
            value={
              event.priceRanges?.[0]
                ? `KES ${event.priceRanges[0].min} - ${event.priceRanges[0].max}`
                : "Contact organiser"
            }
          />
          <Info
            label="Available Tickets"
            value={
              event.dates?.status?.code === "onsale"
                ? "Available"
                : "Limited / Check"
            }
          />
        </div>

        <a
          href={event.url}
          target="_blank"
          rel="noreferrer"
          className="btn-book"
        >
          Book Ticket
        </a>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="info-card">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
