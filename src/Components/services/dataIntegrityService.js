// dataIntegrityService.js
// `event.quantityBooked` is stored, but it's really *derived* from
// confirmed bookings — see event-data-schema.md section 4, which flags
// this as a real race-condition risk once this moves off localStorage.
// This service can detect drift (and fix it) rather than trusting the
// stored number blindly.

import { storage } from '../data/storage';

export const dataIntegrityService = {
  check() {
    const events = storage.getEvents();
    const bookings = storage.getBookings();
    const eventIds = new Set(events.map((e) => e.id));

    const orphanedBookings = bookings.filter((b) => !eventIds.has(b.eventId));

    const mismatches = events
      .map((e) => {
        const actual = bookings
          .filter((b) => b.eventId === e.id && b.status === 'confirmed')
          .reduce((sum, b) => sum + b.quantity, 0);
        return actual !== e.quantityBooked ? { eventId: e.id, title: e.title, stored: e.quantityBooked, actual } : null;
      })
      .filter(Boolean);

    const issues = [];
    if (orphanedBookings.length) {
      issues.push(`${orphanedBookings.length} booking(s) reference an event that no longer exists`);
    }
    if (mismatches.length) {
      issues.push(`${mismatches.length} event(s) have a ticket count that doesn't match actual bookings`);
    }

    return { healthy: issues.length === 0, issues, orphanedBookings, mismatches };
  },

  repair() {
    const before = this.check();

    if (before.orphanedBookings.length) {
      const orphanIds = new Set(before.orphanedBookings.map((b) => b.id));
      storage.setBookings(storage.getBookings().filter((b) => !orphanIds.has(b.id)));
    }

    if (before.mismatches.length) {
      const fixMap = new Map(before.mismatches.map((m) => [m.eventId, m.actual]));
      storage.setEvents(
        storage.getEvents().map((e) => (fixMap.has(e.id) ? { ...e, quantityBooked: fixMap.get(e.id) } : e))
      );
    }

    return this.check(); // post-repair status, should be healthy: true
  },
};
