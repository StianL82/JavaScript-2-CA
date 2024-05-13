import { API_SOCIAL_URL } from "../constants.mjs";
import { getLoggedInUser } from "../../components/getLoggedInUser.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

export async function getUserPosts() {
  try {
    const userProfile = getLoggedInUser();
    if (!userProfile) {
      return [];
    }

    const getPostsURL = `${API_SOCIAL_URL}${action}?_author=true`;
    const response = await authFetch(getPostsURL);
    const posts = await response.json();

    return posts.filter((post) => post.author.name === userProfile.name);
  } catch (error) {
    console.error("An error occurred while fetching user posts:", error);
    throw error;
  }
}
