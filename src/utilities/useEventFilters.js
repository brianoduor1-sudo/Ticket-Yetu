import { useMemo, useState } from "react";
import { filterEvents } from "./filterEvents";

/*
  HOW TO USE THIS:
    const {
      filteredEvents, category, location, dateFrom, dateTo,
      minPrice, maxPrice,
      setSearchTerm, setCategory, setLocation, setDateRange, setPriceRange,
    } = useEventFilters(allEvents);

  Then hand the setters to the components that collect user input:
    <HeroSection onSearch={setSearchTerm} />
    <CategoriesSection onSelect={setCategory} />
    <FilterBar location={location} onLocationChange={setLocation} ... />

  ...and render filteredEvents wherever the event cards get displayed.
*/
export function useEventFilters(events = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  // useMemo re-runs filterEvents only when one of the listed values
  // actually changes, instead of on every single re-render.
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
    // bundles both date fields into one setter, since FilterBar
    // updates them together
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