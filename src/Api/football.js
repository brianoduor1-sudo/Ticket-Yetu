import axios from "axios";

const api = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-apisports-key": import.meta.env.VITE_API_FOOTBALL_KEY,
  },
});

// FKF Premier League fixtures
export const getKPLFixtures = async () => {
  const res = await api.get("/fixtures", {
    params: {
      league: 273, // replace with actual Kenya league id
      season: 2026,
      next: 10,
    },
  });

  return res.data.response;
};

// National Super League fixtures
export const getNSLFixtures = async () => {
  const res = await api.get("/fixtures", {
    params: {
      league: 274, // replace with actual NSL league id
      season: 2026,
      next: 10,
    },
  });

  return res.data.response;
};
