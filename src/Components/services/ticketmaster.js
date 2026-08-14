const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function fetchSportsEvents() {
  const response = await fetch(
    `${BASE_URL}/events.json?classificationName=sports&size=20&apikey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  console.log("Sports API response:", data);

  return data._embedded?.events || [];
}

export async function fetchEntertainmentEvents() {
  const response = await fetch(
    `${BASE_URL}/events.json?classificationName=music&size=20&apikey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  console.log("Entertainment API response:", data);

  return data._embedded?.events || [];
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
