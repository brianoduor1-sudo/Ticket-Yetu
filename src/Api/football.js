import axios from "axios";

export const footballEvents = [
  {
    id: 1,
    name: "Gor Mahia vs AFC Leopards",
    category: "FKF Premier League",
    date: "2026-09-20",
    time: "15:00",
    location: "Nyayo Stadium, Nairobi",
    venue: "Nyayo National Stadium",
    organiser: "FKF Premier League",
    price: 500,
    availableTickets: 1200,
    description:
      "Experience the biggest football derby in Kenya as Gor Mahia face AFC Leopards in a thrilling FKF Premier League showdown.",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 2,
    name: "Nairobi United vs APS Bomet",
    category: "National Super League",
    date: "2026-09-22",
    time: "14:00",
    location: "Kasarani Annex, Nairobi",
    venue: "Kasarani Annex Stadium",
    organiser: "NSL Kenya",
    price: 300,
    availableTickets: 900,
    description:
      "Catch the National Super League action live as Nairobi United host APS Bomet in a crucial league encounter.",
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=1200&q=80",
  },
];
