import { useState } from "react";
import EventLocationPin from "./components/EventLocationPin";
import EventMap from "./components/EventMap";
import LocationPicker from "./components/LocationPicker";

// Sample event location — swap for a real event's saved location
// once wired to actual data.
const SAMPLE_LOCATION = {
  address: "KICC Grounds, Nairobi",
  lat: -1.2897,
  lng: 36.8217,
};

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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
        Location & Map — Test
      </h1>

      {/* ---- Flow 1: Event Details page ---- */}
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">
          Sauti Sol Reunion Concert
        </h2>
        <p className="mt-1 text-sm text-gray-500">Oct 10, 2026 · 7:00 PM</p>

        {/* The clickable pin — click it and the page should smooth-
            scroll down to the map below. */}
        <div className="mt-2">
          <EventLocationPin location={SAMPLE_LOCATION} />
        </div>

        <p className="mt-4 text-sm text-gray-600">
          A night of reunion hits at KICC Grounds.
        </p>
      </section>

      {/* id has to match EventLocationPin's href="#event-location"
          exactly — EventMap already sets this on its own <section>. */}
      <div className="mx-auto max-w-2xl">
        <EventMap location={SAMPLE_LOCATION} />
      </div>

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