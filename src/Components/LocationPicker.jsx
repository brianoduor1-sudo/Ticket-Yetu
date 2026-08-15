import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// This fixes a common bug where the map pin icon doesn't show up
// correctly when using Leaflet inside tools like Vite. We're telling
// Leaflet exactly where to find the pin images online instead.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Where the map is centered when it first loads, before any pin is
// placed. Currently set to Nairobi, change if needed.
const DEFAULT_CENTER = [-1.2921, 36.8219];

// A small helper component whose only job is to listen for clicks
// on the map. When someone clicks anywhere on the map, it tells us
// the exact latitude/longitude of that click.
function ClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null; // this component doesn't show anything on its own
}

// ============================================================
// WHAT THIS COMPONENT DOES, IN PLAIN WORDS:
//
// Used on the "Create Event" form. The organiser types the venue
// name into a text box, then clicks a spot on the map to drop a pin
// marking exactly where the event is. Every time they type or click,
// we send the full location info (address + coordinates) up to
// whatever form is using this component — the same
// { address, lat, lng } shape EventMap.jsx expects for display.
// ============================================================
export default function LocationPicker({ value, onChange }) {
  // Remembers what's typed in the address text box.
  // If a value was already passed in (e.g. editing an existing
  // event), we start with that instead of blank.
  const [address, setAddress] = useState(value?.address || "");

  // Remembers where the pin currently is on the map (lat/lng).
  // Starts as "no pin yet" unless a value was already passed in.
  const [position, setPosition] = useState(
    value?.lat && value?.lng ? { lat: value.lat, lng: value.lng } : null,
  );

  // Runs every time the person types in the address box.
  function handleAddressChange(e) {
    const newAddress = e.target.value;
    setAddress(newAddress);
    // Send the updated info up to the parent form right away.
    onChange({
      address: newAddress,
      lat: position?.lat ?? null,
      lng: position?.lng ?? null,
    });
  }

  // Runs when the person clicks somewhere on the map.
  function handleMapSelect(latlng) {
    setPosition(latlng);
    // Send the updated info (including the new coordinates) up to
    // the parent form.
    onChange({ address, lat: latlng.lat, lng: latlng.lng });
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="venue-address"
        className="block text-sm font-medium text-gray-700"
      >
        Venue / Address
      </label>

      {/* Plain text box for typing the venue name, e.g.
          "Kenyatta University, Main Campus" */}
      <input
        id="venue-address"
        type="text"
        placeholder="e.g. Kenyatta University, Main Campus"
        value={address}
        onChange={handleAddressChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
      />

      <p className="text-xs text-gray-500">
        Click on the map below to drop a pin at the exact venue location.
      </p>

      {/* Leaflet needs an explicit pixel height on its container,
          same rule as every other map in this app */}
      <div className="h-[300px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <MapContainer
          // If a pin already exists, center the map on it. Otherwise,
          // center on the default location (Nairobi).
          center={position ? [position.lat, position.lng] : DEFAULT_CENTER}
          zoom={13}
          className="h-full w-full"
        >
          {/* This is what actually draws the visible map tiles
              (roads, buildings, etc), pulled from OpenStreetMap. */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Listens for map clicks and reports back the coordinates */}
          <ClickHandler onSelect={handleMapSelect} />

          {/* Only show a pin if one has actually been placed */}
          {position && <Marker position={[position.lat, position.lng]} />}
        </MapContainer>
      </div>

      {/* Small text showing the exact coordinates, just for
          confirmation/debugging, helpful while building/testing */}
      {position && (
        <p className="text-xs text-gray-400">
          Selected: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
        </p>
      )}
    </div>
  );
}
