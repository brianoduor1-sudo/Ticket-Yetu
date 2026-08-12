import EventCard from "./EventCard";

const sportsEvents = [
  {
    id: "kpl-001",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    name: "Gor Mahia vs AFC Leopards",
    date: "2026-09-20",
    time: "15:00",
    location: "Nyayo Stadium, Nairobi",
    category: "FKF Premier League",
    price: 500,
    availableTickets: 1200,
  },
  {
    id: "rugby-003",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    name: "Nairobi City Thunder vs Ulinzi Warriors",
    date: "2026-09-29",
    time: "18:00",
    location: "Kasarani Indoor Arena",
    category: "Basketball",
    price: 400,
    availableTickets: 700,
  },
];

export default function SportsPage() {
  return (
    <div
      style={{
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, #1e1b4b 0%, #0b1020 40%, #020617 100%)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", fontSize: "3rem" }}>
        🏆 Sports Events
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          maxWidth: "1280px",
          margin: "32px auto 0",
        }}
      >
        {sportsEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
