// Filters the full events list against search/filter state from FilterBar.
// event shape: { id, image, name, date, time, location, category, price, availableTickets }
export function filterEvents(
  events,
  {
    searchTerm = "",
    category = "All",
    location = "",   // dedicated Location field, separate from main search
    dateFrom = null, // e.g. "2026-09-01"
    dateTo = null,
    minPrice = null,
    maxPrice = null,
  } = {}
) {
  const term = searchTerm.trim().toLowerCase();

  return events.filter((event) => {
    const matchesSearch =
      term === "" ||
      event.name?.toLowerCase().includes(term) ||
      event.location?.toLowerCase().includes(term) ||
      event.category?.toLowerCase().includes(term);

    const matchesCategory = category === "All" || event.category === category;

    const matchesLocation =
      location === "" ||
      event.location?.toLowerCase().includes(location.toLowerCase());

    const eventDate = event.date ? new Date(event.date) : null;
    const matchesDateFrom =
      !dateFrom || (eventDate && eventDate >= new Date(dateFrom));
    const matchesDateTo =
      !dateTo || (eventDate && eventDate <= new Date(dateTo));

    const matchesMinPrice = minPrice == null || event.price >= minPrice;
    const matchesMaxPrice = maxPrice == null || event.price <= maxPrice;

    // event must pass every filter to be included
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