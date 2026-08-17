import { useState } from "react";



export default function CategoriesSection({ groups = {}, onSelect }) {
  const [activeGroup, setActiveGroup] = useState("All");
  const [activeCategory, setActiveCategory] = useState(null);

  const groupNames = ["All", ...Object.keys(groups)];
  const specificCategories = groups[activeGroup] ?? [];

  const handleGroupClick = (group) => {
    setActiveGroup(group);
    setActiveCategory(null);

    // Always notify the parent immediately  clicking a group (e.g.
    // "Sports") should filter to that group right away, even if it
    // also has children (Football/Rugby) shown below for narrowing.
    onSelect?.(group);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onSelect?.(category);
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Browse by category
      </h2>

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