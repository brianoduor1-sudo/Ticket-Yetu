const KEYS = {
  subscribers: "ticketyetu_subscribers",
  events: "ticketyetu_events",
  bookings: "ticketyetu_bookings",
  notifications: "ticketyetu_notifications",
};

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const storage = {
  getSubscribers() { return read(KEYS.subscribers); },
  setSubscribers(v) { return write(KEYS.subscribers, v); },

  getEvents() { return read(KEYS.events); },
  setEvents(v) { return write(KEYS.events, v); },

  getBookings() { return read(KEYS.bookings); },
  setBookings(v) { return write(KEYS.bookings, v); },

  getNotifications() { return read(KEYS.notifications); },
  setNotifications(v) { return write(KEYS.notifications, v); },
};