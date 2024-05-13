import { countUserPosts } from "../components/countUserPosts.mjs";

async function updateUserPostsCount() {
  const postsCount = await countUserPosts();
  const postsCountElement = document.querySelector(".user-posts-count");
  if (postsCountElement) {
    postsCountElement.textContent = `${postsCount} Posts`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateUserPostsCount();
});
