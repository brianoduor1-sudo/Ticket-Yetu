import { mockEvents } from "./mockEvents.js";

// Simulates network latency so loading states are still visible/testable.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchSportsEvents() {
  await delay(400);
  return mockEvents.filter((e) => e.classifications[0].segment.name === "Sports");
}

export async function fetchEntertainmentEvents() {
  await delay(400);
  return mockEvents.filter((e) => e.classifications[0].segment.name === "Music");
}

export async function fetchEventById(id) {
  await delay(300);
  const event = mockEvents.find((e) => e.id === id);
  if (!event) throw new Error("Event not found");
  return event;
}

export async function fetchEventsByKeyword(keyword) {
  await delay(400);
  const lower = keyword.toLowerCase();
  return mockEvents.filter(
    (e) =>
      e.name.toLowerCase().includes(lower) ||
      e.classifications[0]?.genre?.name?.toLowerCase().includes(lower)
  );
}