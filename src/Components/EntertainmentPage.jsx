import EventCard from "./EventCard";

const entertainmentEvents = [
  {
    id: "music-005",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    name: "Sauti Sol Reunion Concert",
    date: "2026-10-10",
    time: "19:00",
    location: "KICC Grounds, Nairobi",
    category: "Music",
    price: 2500,
    availableTickets: 3200,
  },
  {
    id: "festival-006",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    name: "Nairobi Afrobeat Festival",
    date: "2026-10-18",
    time: "14:00",
    location: "Uhuru Gardens, Nairobi",
    category: "Festival",
    price: 1800,
    availableTickets: 5000,
  },
  {
    id: "comedy-007",
    image:
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=1200&q=80",
    name: "Churchill Comedy Night",
    date: "2026-11-01",
    time: "19:30",
    location: "Carnivore Grounds, Nairobi",
    category: "Comedy",
    price: 1200,
    availableTickets: 1800,
  },
];

export default function EntertainmentPage() {
  return (
    <div
      style={{
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, #4c1d95 0%, #111827 45%, #020617 100%)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", fontSize: "3rem" }}>
        🎵 Entertainment Events
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
        {entertainmentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
