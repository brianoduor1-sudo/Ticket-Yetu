// ============================================================
//
// A small "pin + address" line meant to sit near the top of the
// Event Details page (e.g. next to the date/time). Clicking it
// smooth-scrolls down the same page to the full map, which is
// rendered by EventMap.jsx further down.
//
// This ONLY works if EventMap.jsx's outer <section> still has
// id="event-location" — the href below has to match that id
// exactly, or the click does nothing.
// ============================================================

// location = { address, lat, lng } passed down from EventDetailsPage.
// Can be null if the event has no venue coordinates yet.
export default function EventLocationPin({ location }) {
  // If there's no address to show yet, don't render a pin that
  // links to nothing.
  if (!location || !location.address) {
    return null;
  }

  return (
    // href="#event-location" is a plain anchor-link scroll — no JS
    // scroll logic needed, the browser handles it natively as long
    // as an element on the page has that exact id.
    <a
      href="#event-location"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline"
    >
      {/* Simple pin icon, no icon library dependency (no lucide-react
          or similar needed just for this one icon).
          width/height set directly on the SVG (not just via the
          h-4/w-4 Tailwind classes) so it renders at the right small
          size even if Tailwind isn't loading correctly on this page —
          this was the actual bug causing the icon to render huge. */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        width="16"
        height="16"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.69 18.933a.75.75 0 0 0 .62 0c.084-.038.204-.104.363-.201a17.7 17.7 0 0 0 2.415-1.821C14.845 15.3 17 12.5 17 9.25 17 5.264 13.866 2 10 2s-7 3.264-7 7.25c0 3.25 2.156 6.05 3.912 7.66a17.7 17.7 0 0 0 2.415 1.821c.159.097.279.163.363.201ZM10 11.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
          clipRule="evenodd"
        />
      </svg>
      {/* the venue address itself, e.g. "UMA Show Grounds, Kampala" */}
      {location.address}
    </a>
  );
}