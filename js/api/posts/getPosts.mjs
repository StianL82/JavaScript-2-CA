import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

export async function getPosts() {
  try {
    const getPostsURL = `${API_SOCIAL_URL}${action}?_author=true`;
    const response = await authFetch(getPostsURL);

    return await response.json();
  } catch (error) {
    console.error("An error occurred while fetching the posts:", error);
    throw error;
  }
}
