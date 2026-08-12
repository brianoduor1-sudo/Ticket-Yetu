import { useEffect, useState } from "react";
import { getEvents } from "../Api/ticketmaster";
import EventCard from "./EventCard";
import { getEvents } from "../Api/ticketmaster";

export default function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <div style={{ padding: "30px", background: "#0b1020", minHeight: "100vh" }}>
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "30px" }}>
        Upcoming Events in Kenya
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
