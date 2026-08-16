// bookingService.js
// Owns the one invariant that matters most: you can't book more
// tickets than are available.

import { storage } from '../../data/storage';
import { eventService } from './eventService';
import { notificationService } from './notificationService';

function uuid() {
  return 'bkg_' + Math.random().toString(36).slice(2, 10);
}

function ticketCode(organiserPrefix) {
  return `${organiserPrefix.toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export const bookingService = {
  getAll() {
    return storage.getBookings();
  },

  getForEvent(eventId) {
    return storage.getBookings().filter((b) => b.eventId === eventId);
  },

  getAvailability(event) {
    return Math.max(0, event.quantityTotal - event.quantityBooked);
  },

  create({ eventId, quantity, attendeeName, attendeeEmail, paymentMethod, paymentReference }) {
    const event = eventService.getById(eventId);
    if (!event) return { success: false, error: 'Event not found.' };
    if (event.status !== 'published') return { success: false, error: 'This event is no longer available.' };

    const available = this.getAvailability(event);
    if (quantity < 1) return { success: false, error: 'Choose at least 1 ticket.' };
    if (quantity > available) {
      return { success: false, error: `Only ${available} ticket${available === 1 ? '' : 's'} left.` };
    }

    const booking = {
      id: uuid(),
      eventId,
      quantity,
      totalPrice: event.price * quantity,
      attendeeName,
      attendeeEmail,
      status: 'confirmed',
      ticketCode: ticketCode(event.title.slice(0, 3)),
      paymentMethod: paymentMethod || (event.price === 0 ? 'free' : 'unknown'),
      paymentReference: paymentReference || null,
      createdAt: new Date().toISOString(),
    };

    const bookingWriteOk = storage.setBookings([...storage.getBookings(), booking]);
    if (!bookingWriteOk) {
      return {
        success: false,
        error: 'Could not save your booking — your browser storage may be full or blocked. Try freeing up space and try again.',
      };
    }

    const updatedEvent = eventService.update(eventId, { quantityBooked: event.quantityBooked + quantity });
    if (!updatedEvent) {
      storage.setBookings(storage.getBookings().filter((b) => b.id !== booking.id));
      return {
        success: false,
        error: 'Could not confirm your booking — your browser storage may be full or blocked. Nothing was charged, but please try again.',
      };
    }

    notificationService.notifyBookingConfirmed(booking, event);

    return { success: true, booking };
  },

  cancel(bookingId) {
    const bookings = storage.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) return { success: false, error: 'Booking not found.' };

    const original = bookings[idx];
    const nextBookings = [...bookings];
    nextBookings[idx] = { ...original, status: 'cancelled' };

    const bookingWriteOk = storage.setBookings(nextBookings);
    if (!bookingWriteOk) {
      return { success: false, error: 'Could not cancel this booking — your browser storage may be full or blocked.' };
    }

    const event = eventService.getById(original.eventId);
    if (event) {
      const updatedEvent = eventService.update(event.id, {
        quantityBooked: Math.max(0, event.quantityBooked - original.quantity),
      });
      if (!updatedEvent) {
        storage.setBookings(bookings);
        return { success: false, error: 'Could not release the ticket back to availability — cancellation was not completed.' };
      }
    }

    return { success: true };
  },
};