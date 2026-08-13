const CATEGORY_GROUPS = {
  Entertainment: ["Comedy", "Music", "Festival"],
  Sports: ["FKF Premier League", "National Super League", "Rugby Sevens", "Basketball"],
};

export function getGroupNames() {
  return Object.keys(CATEGORY_GROUPS);
}

export function getSpecificCategories(group) {
  return CATEGORY_GROUPS[group] ?? [];
}
