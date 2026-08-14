import axios from "axios";

export const entertainmentEvents = [
  {
    id: 7,
    name: "Sauti Sol Reunion Concert",
    category: "Music",
    date: "2026-10-10",
    time: "19:00",
    location: "KICC Grounds, Nairobi",
    venue: "KICC Grounds",
    organiser: "TicketYetu Live",
    price: 2500,
    availableTickets: 3200,
    description:
      "Join thousands of fans for an unforgettable night of live music, lights, and performances by top Kenyan artists.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 8,
    name: "Nairobi Afrobeat Festival",
    category: "Festival",
    date: "2026-10-18",
    time: "14:00",
    location: "Uhuru Gardens, Nairobi",
    venue: "Uhuru Gardens",
    organiser: "Afrobeat Kenya",
    price: 1800,
    availableTickets: 5000,
    description:
      "A full-day festival featuring Afrobeat, Amapiano, food vendors, fashion, and cultural experiences from across Africa.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 9,
    name: "Otile Brown Live in Mombasa",
    category: "Music",
    date: "2026-10-25",
    time: "20:00",
    location: "Mama Ngina Waterfront, Mombasa",
    venue: "Mama Ngina Waterfront",
    organiser: "Coast Events Kenya",
    price: 2200,
    availableTickets: 2100,
    description:
      "Experience Otile Brown performing his biggest hits live by the ocean in Mombasa.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 10,
    name: "Churchill Comedy Night",
    category: "Comedy",
    date: "2026-11-01",
    time: "19:30",
    location: "Carnivore Grounds, Nairobi",
    venue: "Carnivore Grounds",
    organiser: "Churchill Show",
    price: 1200,
    availableTickets: 1800,
    description:
      "An evening of laughter featuring Churchill and Kenya's top stand-up comedians.",
    image:
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 11,
    name: "Gengetone Street Festival",
    category: "Festival",
    date: "2026-11-08",
    time: "15:00",
    location: "Kasarani Stadium, Nairobi",
    venue: "Kasarani Stadium",
    organiser: "Street Culture KE",
    price: 1500,
    availableTickets: 4200,
    description:
      "Celebrate Kenyan urban culture with live performances, dance battles, DJs, and street food.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 12,
    name: "Eric Omondi Comedy Special",
    category: "Comedy",
    date: "2026-11-15",
    time: "20:00",
    location: "Sarit Expo Centre, Nairobi",
    venue: "Sarit Expo Centre",
    organiser: "Laugh Factory Kenya",
    price: 1000,
    availableTickets: 1400,
    description:
      "A premium comedy special with Eric Omondi and surprise guest comedians.",
    image:
      "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=1200&q=80",
  },
];
