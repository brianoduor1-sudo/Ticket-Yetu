import { useState } from "react";
import { getGroupNames, getSpecificCategories } from "../utilities/categoryGroups";

export default function CategoriesSection({ onSelect }) {
  // Which group button (row 1) is currently selected. Starts on "All".
  const [activeGroup, setActiveGroup] = useState("All");
  // Which specific button (row 2) is currently selected. Null = none picked yet.
  const [activeCategory, setActiveCategory] = useState(null);

  // Build the list of row 1 buttons: "All" plus every group name from categoryGroups.js
  const groupNames = ["All", ...getGroupNames()];
  // Get the row 2 buttons that belong to whichever group is currently active
  const specificCategories = getSpecificCategories(activeGroup);

  // Called when a ROW 1 (group) button is clicked
  const handleGroupClick = (group) => {
    setActiveGroup(group);       // mark this group as active
    setActiveCategory(null);     // reset row 2 selection since we switched groups

    // Check if this group has any children in row 2
    const children = getSpecificCategories(group);

    // If it's "All", or the group has no children, treat the group name
    // itself as the filter value and notify the parent right away.
    // (No children means there's no row 2 to wait for a click from.)
    if (group === "All" || children.length === 0) {
      onSelect?.(group);
    }
    // If the group DOES have children (e.g. "Sports"), do nothing else here —
    // we wait for the user to pick one of the row 2 buttons instead.
  };

  // Called when a ROW 2 (specific category) button is clicked
  const handleCategoryClick = (category) => {
    setActiveCategory(category); // mark this specific category as active
    onSelect?.(category);        // notify the parent — this is a real event.category value
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Browse by category
      </h2>

      {/* ROW 1: group buttons — "All", "Entertainment", "Sports", etc. */}
      <div className="flex flex-wrap gap-2">
        {groupNames.map((group) => {
          // Highlight this button if it matches the currently active group
          const isActive = group === activeGroup;
          return (
            <button
              key={group}
              onClick={() => handleGroupClick(group)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-600 text-white"       // active style
                  : "bg-violet-100 text-violet-700 hover:bg-violet-200" // inactive style
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>

      {/* ROW 2: only rendered if the active group actually has specific categories */}
      {specificCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 pl-2">
          {specificCategories.map((category) => {
            // Highlight this button if it matches the currently active category
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "border-violet-600 bg-violet-600 text-white"       // active style
                    : "border-violet-300 bg-white text-violet-600 hover:bg-violet-50" // inactive style
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}