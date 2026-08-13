// ============================================================
// WHAT THIS FILE DOES, IN PLAIN WORDS:
//
// This is just one function. You give it the full list of events,
// plus whatever the user typed/selected/picked, and it hands back
// only the events that match all of it.
//
// It matches the REAL event data shape confirmed from Brian:
//   { id, image, name, date, time, location, category, price, availableTickets }
//
// The searchTerm/category logic below is unchanged from the
// confirmed version — location, date range, and price range are
// added on top, using fields that already exist in that same
// confirmed shape (date, price), to cover the rest of PRD 5.4.
// ============================================================
export function filterEvents(
  events,
  {
    searchTerm = "",
    category = "All",
    location = "",   // dedicated Location field in FilterBar (separate from search)
    dateFrom = null, // e.g. "2026-09-01"
    dateTo = null,
    minPrice = null,
    maxPrice = null,
  } = {}
) {
  // Clean up the search text: remove extra spaces, make it lowercase,
  // so "Music" and "music" and "  music  " all match the same way.
  const term = searchTerm.trim().toLowerCase();

  // .filter() goes through every event one by one, and only keeps
  // the ones where the function inside returns true.
  return events.filter((event) => {
    // ---- Search: unchanged from the confirmed version ----
    const matchesSearch =
      term === "" ||
      event.name?.toLowerCase().includes(term) ||
      event.location?.toLowerCase().includes(term) ||
      event.category?.toLowerCase().includes(term);

    // ---- Category: unchanged ----
    const matchesCategory = category === "All" || event.category === category;

    // ---- Location: a dedicated filter field, separate from the main
    // search box (e.g. FilterBar's "Location" input) ----
    const matchesLocation =
      location === "" ||
      event.location?.toLowerCase().includes(location.toLowerCase());

    // ---- Date range: uses the confirmed "date" field ----
    const eventDate = event.date ? new Date(event.date) : null;
    const matchesDateFrom =
      !dateFrom || (eventDate && eventDate >= new Date(dateFrom));
    const matchesDateTo =
      !dateTo || (eventDate && eventDate <= new Date(dateTo));

    // ---- Price range: uses the confirmed "price" field ----
    const matchesMinPrice = minPrice == null || event.price >= minPrice;
    const matchesMaxPrice = maxPrice == null || event.price <= maxPrice;

    // Only keep this event if EVERY check above passed.
    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
}