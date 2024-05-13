import { filterPosts } from "../components/sort.mjs";

export function setupSortListener() {
  document.addEventListener("DOMContentLoaded", () => {
    const sortBy = document.getElementById("sortBy");

    if (sortBy) {
      sortBy.value = "all";
      sortBy.addEventListener("change", () => {
        filterPosts(sortBy.value);
      });
    } else {
      console.error("Sort by element not found.");
    }
  });
}
