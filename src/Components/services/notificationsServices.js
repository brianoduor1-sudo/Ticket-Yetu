// notificationService.js
// In-app notifications only, per the project doc — email/SMS reminders
// are Phase 2 and need a backend to send from. This covers the two
// realistic MVP triggers: a booking being confirmed, and an organiser
// changing something that affects people who already booked.

import { storage } from '../data/storage';

function uuid() {
  return 'ntf_' + Math.random().toString(36).slice(2, 10);
}

function create({ type, title, message, eventId, bookingId }) {
  const notification = {
    id: uuid(),
    type,
    title,
    message,
    eventId: eventId || null,
    bookingId: bookingId || null,
    read: false,
    createdAt: new Date().toISOString(),
  };
  const writeOk = storage.setNotifications([notification, ...storage.getNotifications()]);
  if (!writeOk) {
    // Non-critical — the underlying booking/event change already
    // succeeded or failed on its own terms. Losing the alert about it
    // is a worse UX, not lost business data, so we log rather than
    // bubble an error up through bookingService/eventService.
    console.warn('notificationService: failed to persist notification', notification.type);
  }
  return notification;
}

export const notificationService = {
  getAll() {
    return [...storage.getNotifications()].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  getUnreadCount() {
    return storage.getNotifications().filter((n) => !n.read).length;
  },

  markAsRead(id) {
    const notifications = storage.getNotifications();
    const idx = notifications.findIndex((n) => n.id === id);
    if (idx === -1) return;
    notifications[idx] = { ...notifications[idx], read: true };
    storage.setNotifications(notifications);
  },

  markAllAsRead() {
    storage.setNotifications(storage.getNotifications().map((n) => ({ ...n, read: true })));
  },

  // ---- Trigger builders — called from eventService/bookingService ----

  notifyBookingConfirmed(booking, event) {
    return create({
      type: 'booking_confirmed',
      title: 'Booking confirmed',
      message: `You're going to "${event.title}" — ${booking.quantity} ticket${booking.quantity === 1 ? '' : 's'}, code ${booking.ticketCode}.`,
      eventId: event.id,
      bookingId: booking.id,
    });
  },

  notifyEventUpdated(event, { venueChanged, dateChanged } = {}) {
    const changes = [venueChanged && 'venue', dateChanged && 'date/time'].filter(Boolean).join(' and ');
    return create({
      type: 'event_updated',
      title: 'Event updated',
      message: `The ${changes || 'details'} for "${event.title}" changed. Check the event page for the latest.`,
      eventId: event.id,
    });
  },

  notifyEventCancelled(event) {
    return create({
      type: 'event_cancelled',
      title: 'Event cancelled',
      message: `"${event.title}" has been cancelled by the organiser.`,
      eventId: event.id,
    });
  },
};
