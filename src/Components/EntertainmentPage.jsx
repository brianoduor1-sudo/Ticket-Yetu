import EventCard from "./EventCard";

// Temporary local data (later move to src/data/events.js)
const entertainmentEvents = [
  {
    id: "music-005",
    image:
      "https://nation.africa/kenya/news/why-sauti-sol-are-right-in-clash-with-azimio-over-extravaganza--3821250",
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
      "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1580321246844110&get_thumbnail=1",
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
      "https://i.ytimg.com/vi/YlhLKrzBc80/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC4pr0BUXvfomNoPUJIKKVHo92_vA",
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
        {entertainmentEvents.length > 0 ? (
          entertainmentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
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
