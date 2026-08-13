import EventCard from "./EventCard";

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
      "https://www.google.com/imgres?q=Nairobi%20Afrobeat%20Festival&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D1580321246844110%26get_thumbnail%3D1&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fafricanbeatsfestival%2Fposts%2Fjoin-one-of-this-summers-most-exciting-music-and-travel-festivals-the-african-be%2F1552251376690908%2F&docid=XDlCcvn7e3ydzM&tbnid=tQB_GXYOSdL0xM&vet=12ahUKEwjYibff9pyWAxWpV6QEHXA_FyQQnPAOegQIIxAA..i&w=1080&h=1920&hcb=2&itg=1&ved=2ahUKEwjYibff9pyWAxWpV6QEHXA_FyQQnPAOegQIIxAA",
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
