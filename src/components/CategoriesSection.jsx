import { useState } from "react";

// Categories users can filter events by.
// "All" is included so users can clear the filter and see everything again.
const CATEGORIES = [
  "All",
  "Workshops",
  "Sports events",
  "Music events",
  "Academic events",
  "Social gatherings",
];

// A row of clickable category buttons (pills). Clicking one highlights
// it and tells the parent component which category to filter events by.
export default function CategoriesSection({ onSelect }) {
  // Tracks which category is currently selected, starting with "All"
  const [active, setActive] = useState("All");

  const handleClick = (category) => {
    setActive(category); // update which button LOOKS active (for styling)
    onSelect?.(category); // pass the choice up so the event list can filter
  };

  return (
    // mx-auto + max-w-5xl = center the section and cap its width,
    // matching the Hero section above it
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Browse by category
      </h2>

      {/* flex = lay the buttons out in a row
          flex-wrap = if they run out of horizontal space, wrap to a new line
          gap-2 = small, even spacing between every button */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = category === active;

          return (
            <button
              key={category}
              onClick={() => handleClick(category)}
              // rounded-full = pill shape. The two color sets below are
              // swapped in and out depending on whether THIS button is
              // the currently active one.
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-600 text-white" // ACTIVE: solid purple pill
                  : "bg-violet-100 text-violet-700 hover:bg-violet-200" // INACTIVE: pale purple, darkens slightly on hover
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}