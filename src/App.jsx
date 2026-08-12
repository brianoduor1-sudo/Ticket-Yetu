import React from "react";
import { useEventFilters } from "./utilities/useEventFilters";

// TEMPORARY sample data — swap out once events are fetched from the
// real backend. Shape matches the confirmed event object.
const SAMPLE_EVENTS = [
  {
    id: "music-005",
    name: "Sauti Sol Reunion Concert",
    category: "Music",
    date: "2026-10-10",
    location: "KICC Grounds, Nairobi",
    price: 2500,
  },
  {
    id: "sports-002",
    name: "FKF Premier League: Gor Mahia vs AFC Leopards",
    category: "FKF Premier League",
    date: "2026-10-10",
    location: "Nyayo Stadium, Nairobi",
    price: 500,
  },
  {
    id: "comedy-011",
    name: "Churchill Show Live",
    category: "Comedy",
    date: "2026-10-15",
    location: "Carnivore Grounds, Nairobi",
    price: 1000,
  },
];


export default function App() {

  const {
    filteredEvents,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    location,
    setLocation,
    minPrice,
    maxPrice,
    setPriceRange,
  } = useEventFilters(SAMPLE_EVENTS);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Search & Filtering — Test
      </h1>

      <div className="mx-auto flex max-w-2xl flex-wrap items-end gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Music"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-violet-500"
          >
            <option>All</option>
            <option>Music</option>
            <option>Comedy</option>
            <option>FKF Premier League</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Nairobi"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Max price</label>
          <input
            type="number"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setPriceRange(minPrice, e.target.value ? Number(e.target.value) : null)
            }
            placeholder="No limit"
            className="w-28 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-violet-500"
          />
        </div>
      </div>

      <ul className="mx-auto mt-6 max-w-2xl space-y-3">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-sm text-gray-400">No events match.</p>
        ) : (
          filteredEvents.map((event) => (
            <li
              key={event.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-gray-900">{event.name}</p>
              <p className="text-sm text-gray-500">
                {event.category} · {event.location} · {event.date}
              </p>
              <p className="text-sm font-medium text-violet-600">
                KES {event.price}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}