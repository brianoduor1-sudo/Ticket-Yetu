import { useBooking } from "../hooks/useBooking";
import { PaymentPanel } from "./PaymentPanel";
import { BookingConfirmation } from "./BookingConfirmation";

export function BookingForm({ event }) {
  const {
    quantity, setQuantity,
    attendeeName, setAttendeeName,
    attendeeEmail, setAttendeeEmail,
    available, totalPrice,
    step, proceed, handlePaymentSuccess, cancelCheckout,
    submitting, result,
  } = useBooking(event);

  if (result?.success) {
    return <BookingConfirmation booking={result.booking} event={event} />;
  }

  if (step === "checkout") {
    return (
      <PaymentPanel
        amount={totalPrice}
        currency="KES"
        onSuccess={handlePaymentSuccess}
        onCancel={cancelCheckout}
      />
    );
  }

  return (
    <div className="booking-card">
      <h3>Book tickets</h3>

      <div className="qty-row">
        <span>Quantity</span>
        <div className="qty-stepper">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => Math.min(available, q + 1))}>+</button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="attendee-name">Full name</label>
        <input id="attendee-name" type="text" value={attendeeName} onChange={(e) => setAttendeeName(e.target.value)} required />
      </div>

      <div className="field">
        <label htmlFor="attendee-email">Email</label>
        <input id="attendee-email" type="email" value={attendeeEmail} onChange={(e) => setAttendeeEmail(e.target.value)} required />
      </div>

      <div className="total-row">
        <span>Total</span>
        <span className="price mono">KES {totalPrice.toLocaleString()}</span>
      </div>

      {result?.error && <p className="error-text">{result.error}</p>}

      <button className="btn-primary" style={{ width: "100%" }} disabled={submitting || available < 1} onClick={proceed}>
        {available < 1 ? "Sold out" : "Continue"}
      </button>
    </div>
  );
}