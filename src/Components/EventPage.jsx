import { Link } from "react-router-dom";

const events = [
  {
    id: "kpl-001",
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80",
    name: "Gor Mahia vs AFC Leopards",
    date: "2026-09-20",
    time: "15:00",
    location: "Nyayo Stadium, Nairobi",
    category: "FKF Premier League",
    price: 500,
    availableTickets: 1200,
  },
  {
    id: "nsl-002",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    name: "Nairobi United vs APS Bomet",
    date: "2026-09-22",
    time: "14:00",
    location: "Kasarani Annex, Nairobi",
    category: "National Super League",
    price: 300,
    availableTickets: 900,
  },
  {
    id: "rugby-003",
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80",
    name: "Kenya Rugby Sevens Invitational",
    date: "2026-09-27",
    time: "10:00",
    location: "RFUEA Grounds, Nairobi",
    category: "Rugby Sevens",
    price: 800,
    availableTickets: 2500,
  },
  {
    id: "basket-004",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    name: "Nairobi City Thunder vs Ulinzi Warriors",
    date: "2026-09-29",
    time: "18:00",
    location: "Kasarani Indoor Arena",
    category: "Basketball",
    price: 400,
    availableTickets: 700,
  },
];

function EventCard({ event }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        overflow: "hidden",
        background: "white",
      }}
    >
      <img
        src={event.image}
        alt={event.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <div style={{ padding: "16px" }}>
        <span
          style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {event.category}
        </span>

        <h3 style={{ marginTop: "12px" }}>{event.name}</h3>

        <p>📅 {event.date}</p>
        <p>⏰ {event.time}</p>
        <p>📍 {event.location}</p>
        <p>💰 KES {event.price}</p>
        <p>🎟️ {event.availableTickets} tickets left</p>

        <Link
          to={`/events/${event.id}`}
          style={{
            display: "inline-block",
            marginTop: "12px",
            background: "#4f46e5",
            color: "white",
            padding: "10px 14px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          View Event
        </Link>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "20px" }}>Upcoming Sports Events in Kenya</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
