const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

// East African country codes
const EAST_AFRICA_COUNTRIES = ["KE", "UG", "TZ", "RW"];

async function fetchEventsForCountry(classification, countryCode) {
  const response = await fetch(
    `${BASE_URL}/events.json?classificationName=${classification}&countryCode=${countryCode}&size=20&apikey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return data._embedded?.events || [];
}

async function fetchEastAfricaEvents(classification) {
  const results = await Promise.allSettled(
    EAST_AFRICA_COUNTRIES.map((code) =>
      fetchEventsForCountry(classification, code),
    ),
  );

  // combine successful results from all countries, ignore any that failed
  const events = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  return events;
}

export async function fetchSportsEvents() {
  const events = await fetchEastAfricaEvents("sports");
  console.log("Sports API response (East Africa):", events);
  return events;
}

export async function fetchEntertainmentEvents() {
  const events = await fetchEastAfricaEvents("music");
  console.log("Entertainment API response (East Africa):", events);
  return events;
}

export async function fetchEventById(id) {
  const response = await fetch(
    `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}