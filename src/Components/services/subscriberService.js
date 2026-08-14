// subscriberService.js
// Newsletter signup. Actually persists (unlike the old footer, which had
// no logic at all) but doesn't send anything — real delivery is the same
// Phase 2 backend dependency as email notifications (see notificationService.js).

import { storage } from '../data/storage';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscriberService = {
  getAll() {
    return storage.getSubscribers();
  },

  subscribe(email) {
    const trimmed = (email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      return { success: false, error: 'Enter a valid email address.' };
    }

    const existing = storage.getSubscribers();
    if (existing.some((s) => s.email === trimmed)) {
      return { success: true, alreadySubscribed: true };
    }

    const writeOk = storage.setSubscribers([
      ...existing,
      { email: trimmed, subscribedAt: new Date().toISOString() },
    ]);

    if (!writeOk) {
      return { success: false, error: 'Could not save — your browser storage may be full or blocked.' };
    }

    return { success: true, alreadySubscribed: false };
  },
};