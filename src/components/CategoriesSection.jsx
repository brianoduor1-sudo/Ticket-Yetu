import { useState } from "react";
import { getGroupNames, getSpecificCategories } from "../utils/categoryGroups";

// ============================================================
// WHAT THIS COMPONENT DOES, IN PLAIN WORDS:
//
// It shows two rows of buttons.
//
// ROW 1 (always visible): group buttons, like "All", "Entertainment", "Sports"
// ROW 2 (only shows up after clicking a group WITH children): the
//        specific buttons inside that group, like "Music", "FKF Premier League"
//
// A group either has children (like "Sports") or doesn't. If it has
// children, clicking the group just opens row 2 and waits for a
// specific pick. If it has NO children, the group itself IS a real
// category value, so clicking it filters immediately, same as "All".
//
// IMPORTANT: the actual category values live in categoryGroups.js,
// and they must exactly match real event.category values confirmed
// from Brian's data (e.g. "Music", "FKF Premier League"), not made-up
// names like "Football" or "Sports events".
// ============================================================

export default function CategoriesSection({ onSelect }) {
  // Remembers which group button is currently selected.
  const [activeGroup, setActiveGroup] = useState("All");
  // Remembers which specific (row 2) button is currently selected.
  const [activeCategory, setActiveCategory] = useState(null);

  const groupNames = ["All", ...getGroupNames()];
  const specificCategories = getSpecificCategories(activeGroup);

  // Runs when someone clicks a ROW 1 (group) button.
  const handleGroupClick = (group) => {
    setActiveGroup(group);
    setActiveCategory(null); // clear any specific selection from before

    // If this group has no specific categories under it, the group
    // NAME is itself a real filter value (matches "All" behaviour),
    // fire onSelect right away instead of waiting for a row 2 click
    // that will never come.
    const children = getSpecificCategories(group);
    if (group === "All" || children.length === 0) {
      onSelect?.(group);
    }
    // Otherwise (e.g. "Sports"), wait for a specific pick below.
  };

  // Runs when someone clicks a ROW 2 (specific category) button.
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onSelect?.(category); // this always matches a real event.category value
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Browse by category
      </h2>

      {/* ROW 1: group buttons (All, Entertainment, Sports...) */}
      <div className="flex flex-wrap gap-2">
        {groupNames.map((group) => {
          const isActive = group === activeGroup;
          return (
            <button
              key={group}
              onClick={() => handleGroupClick(group)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "bg-violet-100 text-violet-700 hover:bg-violet-200"
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>

      {/* ROW 2: only appears if the selected group actually has
          specific categories underneath it */}
      {specificCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 pl-2">
          {specificCategories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-300 bg-white text-violet-600 hover:bg-violet-50"
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