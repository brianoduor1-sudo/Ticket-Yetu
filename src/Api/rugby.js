import axios from "axios";

export const getRugbySevens = async () => {
  const res = await axios.get("https://api.sportmonks.com/v3/rugby/fixtures", {
    params: {
      include: "league,participants,venue",
      api_token: import.meta.env.VITE_RUGBY_KEY,
    },
  });

  return res.data.data;
};
