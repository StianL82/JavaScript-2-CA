import { getUserPosts } from "../api/posts/userPosts.mjs";

async function countUserPosts() {
  try {
    // Anta at `getUserPosts` returnerer en liste med alle postene
    const posts = await getUserPosts();
    return posts.length; // Returnerer antallet posts
  } catch (error) {
    console.error("Failed to load user posts:", error);
    return 0; // Returnerer 0 hvis det er en feil
  }
}

async function updateUserPostsCount() {
  const postsCount = await countUserPosts(); // Hent antall posts
  const postsCountElement = document.querySelector(".user-posts-count");
  if (postsCountElement) {
    postsCountElement.textContent = `${postsCount} Posts`; // Oppdater tekst
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateUserPostsCount(); // Oppdater posttelleren når siden lastes
});
