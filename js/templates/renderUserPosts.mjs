import { getUserPosts } from "../api/posts/userPosts.mjs";
import { postTemplate } from "./post.mjs";
import * as components from "../components/index.mjs";

export async function renderUserPosts() {
  components.showLoadingIndicator();
  const container = document.querySelector(".userPosts");

  try {
    const posts = await getUserPosts();

    container.innerHTML = "";

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
  } catch (error) {
    console.error("Failed to render user posts:", error);
    container.innerHTML = "";
    const errorContainer = document.createElement("div");
    errorContainer.textContent = "Error loading posts. Please try again later.";
    errorContainer.classList.add("alert", "alert-danger", "text-center");
    container.appendChild(errorContainer);
  } finally {
    components.hideLoadingIndicator();
  }
}
