// src/services/bookingService.js

const BOOKINGS_KEY = 'eventhub_bookings';
const EVENTS_KEY = 'eventhub_events';

export const bookingService = {
  // Returns remaining available tickets for an event
  getAvailability(event) {
    if (!event) return 0;
    const capacity = event.capacity || event.quantity || 100;
    const quantityBooked = event.quantityBooked || 0;
    return Math.max(0, capacity - quantityBooked);
  },

  // Creates a booking and persists it in localStorage
  create({ eventId, quantity, attendeeName, attendeeEmail, paymentMethod, paymentReference }) {
    try {
      const existingBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
      const generatedTicketsCode = paymentReference
      ? `TCK-${paymentReference.replace(/[^A-Z0-9]/gi, '').slice(-6).toUpperCase()}`
      : `TCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const newBooking = {
        id: `bk-${Date.now()}`,
        eventId,
        quantity,
        attendeeName,
        attendeeEmail,
        paymentMethod,
        paymentReference: paymentReference || `REF-${Date.now()}`,
        ticketCode : generatedTicketsCode,
        bookedAt: new Date().toISOString(),
        status: 'CONFIRMED'
      };

      // 1. Save new booking
      const updatedBookings = [newBooking, ...existingBookings];
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));

      // 2. Update quantityBooked for the event in localStorage
      const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
      const updatedEvents = events.map((evt) => {
        if (evt.id === eventId) {
          return {
            ...evt,
            quantityBooked: (evt.quantityBooked || 0) + quantity
          };
        }
        return evt;
      });
      localStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));

      return { success: true, booking: newBooking };
    } catch (error) {
      console.error('Booking creation error:', error);
      return { success: false, error: 'Could not complete booking process.' };
    }
  }
};