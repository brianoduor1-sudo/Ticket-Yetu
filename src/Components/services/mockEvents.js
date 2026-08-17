// mockEvents.js
// Local dummy event data shaped like Ticketmaster's API response, so
// existing components (EventCard, SportsPage, EntertainmentPage,
// EventDetailsPage) work unchanged while we're blocked on a real API key.

export const mockEvents = [
  {
    id: "mock-001",
    name: "Nairobi Music Festival",
    images: [{ url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800", width: 800 }],
    classifications: [{ segment: { name: "Music" }, genre: { name: "Pop" } }],
    dates: { start: { localDate: "2026-09-12", localTime: "18:00:00" }, status: { code: "onsale" } },
    priceRanges: [{ min: 1500, max: 5000 }],
    _embedded: { venues: [{ name: "Kasarani Stadium", city: { name: "Nairobi" }, location: { latitude: "-1.2231", longitude: "36.8961" } }] },
    url: "#",
  },
  {
    id: "mock-002",
    name: "Kenya Premier League Final",
    images: [{ url: "/kenyanPremierleague.webp", width: 800 }],
    classifications: [{ segment: { name: "Sports" }, genre: { name: "Football" } }],
    dates: { start: { localDate: "2026-09-20", localTime: "15:00:00" }, status: { code: "onsale" } },
    priceRanges: [{ min: 500, max: 2500 }],
    _embedded: { venues: [{ name: "Nyayo Stadium", city: { name: "Nairobi" }, location: { latitude: "-1.3053", longitude: "36.8219" } }] },
    url: "#",
  },
  {
    id: "mock-003",
    name: "Mombasa Comedy Night",
    images: [{ url: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800", width: 800 }],
    classifications: [{ segment: { name: "Music" }, genre: { name: "Comedy" } }],
    dates: { start: { localDate: "2026-09-28", localTime: "19:30:00" }, status: { code: "onsale" } },
    priceRanges: [{ min: 800, max: 2000 }],
    _embedded: { venues: [{ name: "Mombasa Sports Club", city: { name: "Mombasa" }, location: { latitude: "-4.0435", longitude: "39.6682" } }] },
    url: "#",
  },
  {
    id: "mock-004",
    name: "Rugby Sevens Circuit",
    images: [{ url: "/Rugby game.jpg", width: 800 }],
    classifications: [{ segment: { name: "Sports" }, genre: { name: "Rugby" } }],
    dates: { start: { localDate: "2026-10-05", localTime: "10:00:00" }, status: { code: "onsale" } },
    priceRanges: [{ min: 700, max: 3000 }],
    _embedded: { venues: [{ name: "RFUEA Ground", city: { name: "Nairobi" }, location: { latitude: "-1.2667", longitude: "36.8000" } }] },
    url: "#",
  },
  {
    id: "mock-005",
    name: "Nakuru Jazz Evening",
    images: [{ url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", width: 800 }],
    classifications: [{ segment: { name: "Music" }, genre: { name: "Jazz" } }],
    dates: { start: { localDate: "2026-10-11", localTime: "20:00:00" }, status: { code: "onsale" } },
    priceRanges: [{ min: 1200, max: 4000 }],
    _embedded: { venues: [{ name: "Nakuru Athletic Club", city: { name: "Nakuru" }, location: { latitude: "-0.3031", longitude: "36.0800" } }] },
    url: "#",
  },
];