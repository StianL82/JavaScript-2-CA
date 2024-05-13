import { getPost } from "../api/posts/getPost.mjs";
import { postTemplate } from "./post.mjs";
import * as components from "../components/index.mjs";

export async function renderSinglePost() {
  components.showLoadingIndicator();
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    console.error("No post ID provided!");
    return;
  }

  try {
    const postData = await getPost(postId);
    const postContainer = document.querySelector("#display-single-post");
    const postElement = postTemplate(postData);
    postContainer.innerHTML = "";
    postContainer.appendChild(postElement);
  } catch (error) {
    console.error("Error fetching post:", error);
  } finally {
    components.hideLoadingIndicator();
  }
}
