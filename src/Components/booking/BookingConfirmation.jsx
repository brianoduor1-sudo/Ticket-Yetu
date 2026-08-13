const METHOD_LABEL = {
  free: 'Free entry',
  mpesa: 'Paid via M-Pesa',
  card: 'Paid via card',
  unknown: 'Paid',
};

export function BookingConfirmation({ booking, event }) {
  return (
    <div className="confirmation">
      <span className="eyebrow">Booking confirmed</span>
      <h3 className="display" style={{ fontSize: 20, marginTop: 8 }}>{event.title}</h3>
      <div className="code">{booking.ticketCode}</div>
      <p style={{ color: 'var(--text-dim)', fontSize: 13.5 }}>
        {booking.quantity} ticket{booking.quantity === 1 ? '' : 's'} · sent to {booking.attendeeEmail}
      </p>
      <p style={{ color: 'var(--teal)', fontSize: 12.5, marginTop: 10, fontFamily: 'var(--font-mono)' }}>
        {METHOD_LABEL[booking.paymentMethod] || 'Paid'}
        {booking.paymentReference ? ` · ${booking.paymentReference}` : ''}
      </p>
      <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 16 }}>
        Show this code at the door. Find it anytime under "My tickets".
      </p>
    </div>
  );
}