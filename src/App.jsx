import { useState } from "react";
import EventLocationPin from "./components/EventLocationPin";
import EventMap from "./components/EventMap";
import LocationPicker from "./components/LocationPicker";

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

// This branch only has EventMap.jsx, LocationPicker.jsx, and
// EventLocationPin.jsx — no CategoriesSection, FilterBar, or
// Calendar yet (those are on other branches). This App.jsx proves
// two flows on their own:
//
// 1. Event Details view: EventLocationPin (top) -> click -> scrolls
//    down to EventMap (bottom), which shares the same #event-location
//    id the pin links to.
// 2. Create Event view: LocationPicker lets you click the map to
//    drop a pin, and shows the { address, lat, lng } it produces.
export default function App() {
  const [newLocation, setNewLocation] = useState({ address: "", lat: null, lng: null });

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