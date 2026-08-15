import EventCard from "./EventCard";

// Temporary local data (later move to src/data/events.js)
const sportsEvents = [
  {
    id: "kpl-001",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQ3KIITc4Z04TX_calNmA0EeHQPbBkpcHfHo5iEWXXg&s=10",
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
    image: "https://scrummage.co.ke/2023/09/12/kenya-7s-squad-named/",
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
      "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1587196855982302",
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
        {sportsEvents.length > 0 ? (
          sportsEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
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
export default