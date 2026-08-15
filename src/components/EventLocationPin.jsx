// Pin + address link near the top of Event Details. Clicking scrolls
// down to the map section rendered by EventMap.jsx.
// Requires EventMap.jsx's outer <section> to keep id="event-location" -
// href below must match it exactly.
export default function EventLocationPin({ location }) {
  if (!location || !location.address) return null; // nothing to link to yet

  return (
    <a
      href="#event-location"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline"
    >
      {/* pin icon, no icon library dependency */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.69 18.933a.75.75 0 0 0 .62 0c.084-.038.204-.104.363-.201a17.7 17.7 0 0 0 2.415-1.821C14.845 15.3 17 12.5 17 9.25 17 5.264 13.866 2 10 2s-7 3.264-7 7.25c0 3.25 2.156 6.05 3.912 7.66a17.7 17.7 0 0 0 2.415 1.821c.159.097.279.163.363.201ZM10 11.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
          clipRule="evenodd"
        />
      </svg>
      {location.address}
    </a>
  );
}