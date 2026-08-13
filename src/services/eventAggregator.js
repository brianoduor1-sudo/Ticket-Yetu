import { getPublishedEvents } from "./eventService";
import { formatApiEvent } from "./eventAdapter";

export const getAllEvents = async (
  apiEvents = []
) => {
  const firestoreEvents =
    await getPublishedEvents();

  const formattedApiEvents =
    apiEvents.map(formatApiEvent);

  return [
    ...formattedApiEvents,
    ...firestoreEvents,
  ];
};
