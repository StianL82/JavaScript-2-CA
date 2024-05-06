import * as postMethods from "../api/posts/index.mjs";
import { postTemplate } from "../templates/post.mjs";

let debounceTimer;

export async function searchPosts(query) {
  const posts = await postMethods.getPosts();
  const filteredPosts = posts.filter(
    (post) =>
      (post.title && post.title.toLowerCase().includes(query.toLowerCase())) ||
      (post.body && post.body.toLowerCase().includes(query.toLowerCase())) ||
      (post.author &&
        post.author.name &&
        post.author.name.toLowerCase().includes(query.toLowerCase()))
  );

  const container = document.querySelector("#postsList");
  container.innerHTML = "";
  filteredPosts.forEach((post) => {
    const postElement = postTemplate(post);
    container.appendChild(postElement);
  });
}

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
