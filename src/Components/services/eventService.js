import { storage } from '../../data/storage';

const CATEGORY_MAP = {
  music: 'music', sports: 'sports', arts: 'other', film: 'other',
};

function mapCategory(tmEvent) {
  const segment = tmEvent.classifications?.[0]?.segment?.name?.toLowerCase() || '';
  return CATEGORY_MAP[segment] || 'other';
}

export const eventService = {
  getAll() {
    return storage.getEvents();
  },

  getById(id) {
    return storage.getEvents().find((e) => e.id === id) || null;
  },

  update(id, patch) {
    const events = storage.getEvents();
    const idx = events.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    const updated = { ...events[idx], ...patch };
    const next = [...events];
    next[idx] = updated;
    const ok = storage.setEvents(next);
    return ok ? updated : null;
  },

  // Converts a Ticketmaster event into (or reuses) an internal event
  // record so bookingService has the inventory/price fields it needs.
  // Ticketmaster doesn't expose real ticket inventory, so quantityTotal
  // is a simulated starting pool for this MVP.
  getOrCreateFromTicketmaster(tmEvent) {
    const existing = this.getById(tmEvent.id);
    if (existing) return existing;

    const priceRange = tmEvent.priceRanges?.[0];
    const price = priceRange ? Math.round(priceRange.min) : 0;

    const record = {
      id: tmEvent.id,
      title: tmEvent.name,
      category: mapCategory(tmEvent),
      price,
      quantityTotal: 100,
      quantityBooked: 0,
      status: 'published',
    };

    const ok = storage.setEvents([...storage.getEvents(), record]);
    return ok ? record : record; // still return it so booking can proceed in-memory even if persist fails
  },
};