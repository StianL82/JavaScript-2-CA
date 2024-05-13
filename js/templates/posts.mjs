import { renderPostTemplates } from "./renderPosts.mjs";
import * as postMethods from "../api/posts/index.mjs";

export async function renderPosts() {
  const container = document.querySelector("#postsList");

  try {
    const posts = await postMethods.getPosts();
    container.innerHTML = "";

    renderPostTemplates(posts, container);
  } catch (error) {
    console.error("Failed to load posts:", error);
    container.innerHTML =
      '<div class="alert alert-danger">Unable to load posts. Please try again later.</div>';
  } finally {
    console.log("Attempt to render posts has completed.");
  }
}
