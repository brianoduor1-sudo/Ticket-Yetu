import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// NOTE: leaflet/dist/leaflet.css is imported once globally in main.jsx,
// NOT here. Importing it per-component made it load unreliably and
// caused the marker icon to render huge/unstyled. Don't re-add it here.

// Same icon fix as LocationPicker, needed anywhere we show a map pin.
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

// Event Details page map. Shows a pin at the event's saved location plus
// a "Get Directions" link (Google Maps, coordinates only  no API key).
// id="event-location" is the scroll target for EventLocationPin.jsx's
// pin link  ids must match exactly.
export default function EventMap({ location }) {
  // No saved location -> show a message instead of a broken map
  if (!location || location.lat == null || location.lng == null) {
    return (
      <section
        id="event-location"
        className="mx-auto max-w-5xl scroll-mt-6 px-6 py-10"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Location
        </h2>
        <p className="text-sm text-gray-500">
          No location has been set for this event yet.
        </p>
      </section>
    );
  }

  const { address, lat, lng } = location;

  // Google Maps directions link built from coordinates only (no API call)
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    // scroll-mt-6: breathing room when scrolled into view from the pin link
    <section
      id="event-location"
      className="mx-auto max-w-5xl scroll-mt-6 px-6 py-10"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Location</h2>

      {/* Leaflet requires an explicit pixel height on its container */}
      <div className="h-[280px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <MapContainer center={[lat, lng]} zoom={15} className="h-full w-full">
          {/* base map tiles from OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* pin at event coords, popup shows address */}
          <Marker position={[lat, lng]}>
            <Popup>{address || "Event location"}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">{address}</p>
        {/* opens Google Maps directions in a new tab */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}