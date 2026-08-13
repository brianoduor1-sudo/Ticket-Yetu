// dataManagementService.js
// Backup/restore and demo-reset tools. Also the natural seam for a
// future Firestore migration: exportAll() already produces the exact
// JSON shape a one-time seed script into Firestore would consume.

import { storage, STORAGE_KEYS } from '../data/storage';
import { SCHEMA_VERSION } from '../data/migrations';

export const dataManagementService = {
  exportAll() {
    const payload = {
      exportedAt: new Date().toISOString(),
      schemaVersion: SCHEMA_VERSION,
      events: storage.getEvents(),
      bookings: storage.getBookings(),
      organisers: storage.getOrganisers(),
      notifications: storage.getNotifications(),
      subscribers: storage.getSubscribers(),
    };
    return JSON.stringify(payload, null, 2);
  },

  importAll(jsonString) {
    let data;
    try {
      data = JSON.parse(jsonString);
    } catch {
      return { success: false, error: 'That file is not valid JSON.' };
    }

    if (!Array.isArray(data.events) || !Array.isArray(data.bookings)) {
      return { success: false, error: 'File is missing expected events/bookings arrays.' };
    }

    const writesOk = [
      storage.setEvents(data.events),
      storage.setBookings(data.bookings),
      storage.setOrganisers(data.organisers || []),
      storage.setNotifications(data.notifications || []),
      storage.setSubscribers(data.subscribers || []),
      storage.setMeta({ schemaVersion: SCHEMA_VERSION, importedAt: new Date().toISOString() }),
    ].every(Boolean);

    if (!writesOk) {
      return { success: false, error: 'Import partially failed — your browser storage may be full. Some data may be inconsistent; try Reset if unsure.' };
    }

    return { success: true };
  },

  resetToSeed(mockEvents, mockOrganisers) {
    const writesOk = [
      storage.setEvents(mockEvents),
      storage.setOrganisers(mockOrganisers),
      storage.setBookings([]),
      storage.setNotifications([]),
      storage.setSubscribers([]),
      storage.setMeta({ schemaVersion: SCHEMA_VERSION, resetAt: new Date().toISOString() }),
    ].every(Boolean);

    return { success: writesOk, error: writesOk ? null : 'Reset partially failed — your browser storage may be full or blocked.' };
  },

  getStats() {
    let approxBytes = 0;
    Object.values(STORAGE_KEYS).forEach((key) => {
      const raw = localStorage.getItem(key);
      if (raw) approxBytes += raw.length;
    });

    return {
      events: storage.getEvents().length,
      bookings: storage.getBookings().length,
      notifications: storage.getNotifications().length,
      subscribers: storage.getSubscribers().length,
      approxBytes,
    };
  },
};