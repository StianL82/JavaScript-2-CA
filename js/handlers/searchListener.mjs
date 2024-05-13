let debounceTimer;

export function setupSearchListener() {
  const searchInput = document.querySelector("#searchInput");

  searchInput.value = "";

  searchInput.addEventListener("input", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchPosts(event.target.value);
    }, 1000);
  });
}
