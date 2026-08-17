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

// Maps common search words to the category fetch they should trigger.
// Lets "sports"/"football"/"rugby" etc. return category results even
// when nothing in an event's name or genre literally contains the word.
const CATEGORY_KEYWORDS = {
  sport: fetchSportsEvents,
  sports: fetchSportsEvents,
  football: fetchSportsEvents,
  rugby: fetchSportsEvents,
  music: fetchEntertainmentEvents,
  entertainment: fetchEntertainmentEvents,
  concert: fetchEntertainmentEvents,
};

// Smart search: checks if the query matches a known category word first.
// If so, returns that category's events directly. Otherwise falls back
// to the literal name/genre keyword search above.
export async function smartSearchEvents(query) {
  const normalized = query.trim().toLowerCase();
  const categoryFetch = CATEGORY_KEYWORDS[normalized];

  if (categoryFetch) {
    console.log(`"${query}" matched a category — fetching by category instead of keyword`);
    return categoryFetch();
  }

  return fetchEventsByKeyword(query);
}