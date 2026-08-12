import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Same icon fix as LocationPicker, needed anywhere we show a map pin.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ============================================================

//
// Used on the Event Details page. Shows a small map with a pin at
// the event's saved location, plus a "Get Directions" button that
// opens Google Maps in a new tab using just the coordinates — no
// Google API key needed for that part.
//
// id="event-location" makes this the scroll target for
// EventLocationPin.jsx's clickable pin near the top of the page —
// the two ids have to match exactly, or the pin click does nothing.
// ============================================================
export default function EventMap({ location }) {
  // If this event doesn't have a location saved yet (or it's
  // missing lat/lng), show a simple message instead of a broken map.
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

  // Builds a Google Maps "get directions" link using just the
  // coordinates. This is a normal web link, not an API call, so it
  // works for free with no setup.
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    // scroll-mt-6 leaves a little breathing room above this section
    // when it's scrolled into view from the pin link above
    <section
      id="event-location"
      className="mx-auto max-w-5xl scroll-mt-6 px-6 py-10"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Location</h2>

      {/* Leaflet needs an explicit pixel height on its container,
          same rule as everywhere else we've used it */}
      <div className="h-[280px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <MapContainer center={[lat, lng]} zoom={15} className="h-full w-full">
          {/* Draws the actual visible map, pulled from OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* The pin itself, placed at the event's saved coordinates.
              Clicking it shows a little popup with the address. */}
          <Marker position={[lat, lng]}>
            <Popup>{address || "Event location"}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">{address}</p>
        {/* Opens Google Maps directions in a new browser tab */}
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