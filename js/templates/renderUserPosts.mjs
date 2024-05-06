// i din profilside js-fil

import { getUserPosts } from "../api/posts/userPosts.mjs";
import { postTemplate } from "./post.mjs";

export async function renderUserPosts() {
  const container = document.querySelector(".userPosts");
  const posts = await getUserPosts();

  container.innerHTML = ""; // Tømmer eksisterende innhold

  if (posts.length > 0) {
    posts.forEach((post) => {
      const postElement = postTemplate(post);
      container.appendChild(postElement);
    });
  } else {
    const emptyPostContainer = document.createElement("div");
    emptyPostContainer.classList.add(
      "user-posts-empty",
      "card",
      "mb-4",
      "bg-info",
      "text-black"
    );

    const message = document.createElement("h4");
    message.classList.add("user-posts-message", "text-center", "p-3");
    message.textContent = "No user posts to show";

    emptyPostContainer.appendChild(message);
    container.appendChild(emptyPostContainer);
  }
}
