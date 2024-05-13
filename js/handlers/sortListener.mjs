import { filterPosts } from "../components/sort.mjs";

export function setupSortListener() {
  document.addEventListener("DOMContentLoaded", () => {
    const sortBy = document.getElementById("sortBy");

    if (sortBy) {
      sortBy.value = "all";
      sortBy.addEventListener("change", () => {
        console.log("Sort by changed. New value:", sortBy.value);
        filterPosts(sortBy.value);
      });
    } else {
      console.error("Sort by element not found.");
    }
  });
}
