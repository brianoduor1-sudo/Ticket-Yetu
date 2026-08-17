import { bookingService } from "../services/bookingService";
import { eventService } from "../services/eventService";
import { TicketStub } from "../booking/TicketStub"; // adjust path

export default function MyTickets() {
  const bookings = bookingService.getAll();

  return (
    <div style={{ minHeight: "70vh", padding: "60px", color: "white" }}>
      <h1 style={{ marginBottom: 24 }}>My Tickets</h1>
      {bookings.length === 0 ? (
        <p style={{ color: "var(--text-dim)" }}>No tickets yet — go book something!</p>
      ) : (
        <div className="grid">
          {bookings.map((booking) => (
            <TicketStub key={booking.id} booking={booking} event={eventService.getById(booking.eventId)} />
          ))}
        </div>
      )}
    </div>
  );
}