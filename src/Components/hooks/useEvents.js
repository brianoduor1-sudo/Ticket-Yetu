import { useState, useCallback } from 'react';
import { eventService } from '../services/eventService';

export function useEvents() {
  const [events, setEvents] = useState(() => eventService.getAll());

  const refresh = useCallback(() => {
    setEvents(eventService.getAll());
  }, []);

  return { events, refresh };
}