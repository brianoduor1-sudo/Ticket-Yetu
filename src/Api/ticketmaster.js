import { footballEvents } from "./football";
import { rugbyEvents } from "./rugby";
import { basketballEvents } from "./basketball";
import { entertainmentEvents } from "./entertainment";

const allEvents = [
  ...footballEvents,
  ...rugbyEvents,
  ...basketballEvents,
  ...entertainmentEvents,
];

export async function getEvents() {
  return allEvents;
}

export async function getEventById(id) {
  return allEvents.find((event) => String(event.id) === String(id));
}
