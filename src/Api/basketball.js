import axios from "axios";

export const getBasketballGames = async () => {
  const res = await axios.get("https://v1.basketball.api-sports.io/games", {
    headers: {
      "x-apisports-key": import.meta.env.VITE_API_FOOTBALL_KEY,
    },
    params: {
      league: 12,
      season: 2026,
    },
  });

  return res.data.response;
};
