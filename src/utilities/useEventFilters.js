import { useMemo, useState } from "react";
import { filterEvents } from "./filterEvents";

// Central filter state for the events list. Wire the setters to the
// inputs that collect filter values, render filteredEvents wherever
// event cards are displayed.
//
// e.g.
//   const { filteredEvents, setSearchTerm, setCategory, ... } = useEventFilters(allEvents);
//   <HeroSection onSearch={setSearchTerm} />
//   <CategoriesSection onSelect={setCategory} />
export function useEventFilters(events = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  // only recompute when a dependency actually changes
  const filteredEvents = useMemo(
    () =>
      filterEvents(events, {
        searchTerm,
        category,
        location,
        dateFrom,
        dateTo,
        minPrice,
        maxPrice,
      }),
    [events, searchTerm, category, location, dateFrom, dateTo, minPrice, maxPrice]
  );

  return {
    filteredEvents,
    searchTerm,
    category,
    location,
    dateFrom,
    dateTo,
    minPrice,
    maxPrice,
    setSearchTerm,
    setCategory,
    setLocation,
    // FilterBar updates both date fields together
    setDateRange: (from, to) => {
      setDateFrom(from);
      setDateTo(to);
    },
    setPriceRange: (min, max) => {
      setMinPrice(min);
      setMaxPrice(max);
    },
  };
}