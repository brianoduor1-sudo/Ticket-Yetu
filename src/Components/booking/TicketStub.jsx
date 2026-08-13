import { Link } from 'react-router-dom';

export function TicketStub({ booking, event }) {
  if (!event) return null;

  return (
    <Link to={`/events/${event.id}`} className="ticket">
      <div className={`art ${event.category}`}>
        <span className="cat-tag">{booking.status}</span>
      </div>
      <div className="perf" />
      <div className="info">
        <h3>{event.title}</h3>
        <div className="meta">
          <span className="mono">{booking.ticketCode}</span>
          <span>{booking.quantity} ticket{booking.quantity === 1 ? '' : 's'}</span>
        </div>
      </div>
    </Link>
  );
}
