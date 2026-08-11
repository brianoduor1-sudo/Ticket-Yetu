import { useParams } from "react-router-dom";

const events = {
  "kpl-001": {
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80",
    name: "Gor Mahia vs AFC Leopards",
    description:
      "The legendary Mashemeji Derby returns with Gor Mahia taking on AFC Leopards in a high-stakes FKF Premier League encounter.",
    date: "2026-09-20",
    time: "15:00",
    venue: "Nyayo National Stadium",
    location: "Nairobi, Kenya",
    category: "FKF Premier League",
    organizer: "Football Kenya Federation",
    price: 500,
    availableTickets: 1200,
  },
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = events[id];

  if (!event) return <h2>Event not found</h2>;

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
      <img
        src={event.image}
        alt={event.name}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          borderRadius: "16px",
        }}
      />

      <h1 style={{ marginTop: "20px" }}>{event.name}</h1>

      <p style={{ color: "#475569", lineHeight: 1.7 }}>{event.description}</p>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <Info label="Date" value={event.date} />
        <Info label="Time" value={event.time} />
        <Info label="Venue" value={event.venue} />
        <Info label="Location" value={event.location} />
        <Info label="Category" value={event.category} />
        <Info label="Organizer" value={event.organizer} />
        <Info label="Ticket Price" value={`KES ${event.price}`} />
        <Info label="Available Tickets" value={event.availableTickets} />
      </div>

      <button
        style={{
          marginTop: "24px",
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "14px 22px",
          borderRadius: "10px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Book Ticket
      </button>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <div style={{ color: "#64748b", fontSize: "14px" }}>{label}</div>
      <div style={{ fontWeight: 700, marginTop: "6px" }}>{value}</div>
    </div>
  );
}
