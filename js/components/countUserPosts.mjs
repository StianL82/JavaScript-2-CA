import { getUserPosts } from "../api/posts/userPosts.mjs";

export async function countUserPosts() {
  try {
    const posts = await getUserPosts();
    return posts.length;
  } catch (error) {
    console.error("Failed to load user posts:", error);
    return 0;
  }
}
