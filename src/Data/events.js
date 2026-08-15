export const events = [
  // Sports
  {
    id: "kpl-001",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQ3KIITc4Z04TX_calNmA0EeHQPbBkpcHfHo5iEWXXg&s=10",
    name: "Gor Mahia vs AFC Leopards",
    date: "2026-09-20",
    time: "15:00",
    location: "Nyayo Stadium, Nairobi",
    category: "FKF Premier League",
    price: 500,
    availableTickets: 1200,
  },
  {
    id: "rugby-003",
    image: "https://scrummage.co.ke/2023/09/12/kenya-7s-squad-named/",
    name: "Kenya Rugby Sevens Invitational",
    date: "2026-09-27",
    time: "10:00",
    location: "RFUEA Grounds, Nairobi",
    category: "Rugby Sevens",
    price: 800,
    availableTickets: 2500,
  },
  {
    id: "basket-004",
    image:
      "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1587196855982302",
    name: "Nairobi City Thunder vs Ulinzi Warriors",
    date: "2026-09-29",
    time: "18:00",
    location: "Kasarani Indoor Arena",
    category: "Basketball",
    price: 400,
    availableTickets: 700,
  }, // Entertainment
  {
    id: "music-005",
    image:
      "https://nation.africa/resource/image/3821250/landscape_ratio16x9/1200/675/2b2f2b1d7e4f6d5e7c4a3b2c1d0e9f8/sauti-sol.jpg",
    name: "Sauti Sol Reunion Concert",
    date: "2026-10-10",
    time: "19:00",
    location: "KICC Grounds, Nairobi",
    category: "Music",
    price: 2500,
    availableTickets: 3200,
  },
  {
    id: "festival-006",
    image:
      "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1580321246844110",
    name: "Nairobi Afrobeat Festival",
    date: "2026-10-18",
    time: "14:00",
    location: "Uhuru Gardens, Nairobi",
    category: "Festival",
    price: 1800,
    availableTickets: 5000,
  },
  {
    id: "comedy-007",
    image:
      "https://i.ytimg.com/vi/YlhLKrzBc80/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC4pr0BUXvfomNoPUJIKKVHo92_vA",
    name: "Churchill Comedy Night",
    date: "2026-11-01",
    time: "19:30",
    location: "Carnivore Grounds, Nairobi",
    category: "Comedy",
    price: 1200,
    availableTickets: 1800,
  },
]; // Filtered exports
export const sportsEvents = events.filter((event) =>
  ["FKF Premier League", "Rugby Sevens", "Basketball"].includes(event.category),
);
export const entertainmentEvents = events.filter((event) =>
  ["Music", "Festival", "Comedy"].includes(event.category),
);
