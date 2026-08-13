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

import CategoriesSection from './components/CategoriesSection'
import EventCalendar from './components/EventCalendar'

// Temporary sample events, just so we can SEE the calendar working.
// Real events will come from Brian's data later.
const SAMPLE_EVENTS = [
  {
    id: 1,
    name: "Gor Mahia vs AFC Leopards",
    date: "2026-08-20",
  },
  {
    id: 2,
    name: "Sauti Sol Reunion Concert",
    date: "2026-08-20", // same day as above, on purpose, to test multiple events per day
  },
  {
    id: 3,
    name: "Rugby Sevens Showcase",
    date: "2026-08-22",
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
    <>
      <CategoriesSection onSelect={(category) => console.log("Selected:", category)} />

      <div style={{ padding: "40px 20px" }}>
        <EventCalendar
          events={SAMPLE_EVENTS}
          onSelectEvent={(event) => console.log("Clicked event:", event)}
        />
      </div>

      {/* Original Vite starter content, commented out, uncomment if needed later
      <section id="center">
        ...
      */}
    </>
  )
}

      {/* ---- Flow 2: Create Event form (location step only) ---- */}
      <section className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Create Event — Location Step
        </h2>
        <LocationPicker value={newLocation} onChange={setNewLocation} />

        {/* Just for visibility while testing — shows exactly what
            LocationPicker is sending up via onChange. */}
        <pre className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          {JSON.stringify(newLocation, null, 2)}
        </pre>
      </section>
    </div>
  );
}