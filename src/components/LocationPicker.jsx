import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
// NOTE: leaflet/dist/leaflet.css is imported once globally in main.jsx,
// NOT here. Importing it per-component made it load unreliably and
// caused the marker icon to render huge/unstyled. Don't re-add it here.

// Fix for Leaflet's default marker icons not resolving under Vite 
// point icon URLs at the CDN directly.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  // Force the correct pixel size directly instead of relying on
  // leaflet.css loading correctly — this guarantees a normal-sized
  // pin no matter what CSS load order happens.
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Map center before any pin is placed (Nairobi)
const DEFAULT_CENTER = [-1.2921, 36.8219];

// Listens for map clicks, reports lat/lng back. Renders nothing itself.
function ClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      // e.latlng comes from Leaflet — grab just the two numbers we need
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// value = existing address/lat/lng if editing an event, otherwise undefined
// onChange = function from the parent form, called every time address or pin changes

// Create Event form field: type a venue name, click the map to drop a pin.
// Emits { address, lat, lng } on every change same shape EventMap.jsx expects.
export default function LocationPicker({ value, onChange }) {
  const [address, setAddress] = useState(value?.address || ""); // prefill if editing existing event
  const [position, setPosition] = useState(
    value?.lat && value?.lng ? { lat: value.lat, lng: value.lng } : null
  );

  function handleAddressChange(e) {
    const newAddress = e.target.value;
    setAddress(newAddress);

    // Send the updated info up to the parent form right away.
    // We keep whatever pin position already exists (or null if none yet) —
    // typing an address doesn't move the pin, only clicking the map does.

    onChange({
      address: newAddress,
      lat: position?.lat ?? null,
      lng: position?.lng ?? null,
    });
  }

  function handleMapSelect(latlng) {
    setPosition(latlng);

    // Send the updated info (including the new coordinates) up to
    // the parent form. We keep whatever address text is already typed.


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

      {/* Leaflet requires an explicit pixel height on its container */}
      <div className="h-[300px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <MapContainer
          center={position ? [position.lat, position.lng] : DEFAULT_CENTER}
          zoom={13}
          className="h-full w-full"
        >
          {/* base map tiles from OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {/* Listens for map clicks and reports back the coordinates.
              Renders nothing itself — just wires up the click event. */}
            <ClickHandler onSelect={handleMapSelect} />

            {/* Only show a pin if one has actually been placed —
              avoids showing a pin at (0,0) or some default spot */}

          {position && <Marker position={[position.lat, position.lng]} />}
        </MapContainer>
      </div>


      {/* Small text showing the exact coordinates, just for
          confirmation/debugging, helpful while building/testing.
          toFixed(5) trims to 5 decimal places (~1 meter accuracy) so
          it doesn't show Leaflet's full raw floating-point number. */}

      {/* debug/confirmation text, useful while testing */}

      {position && (
        <p className="text-xs text-gray-400">
          Selected: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
        </p>
      )}
    </div>
  );
}