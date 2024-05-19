import { API_SOCIAL_URL } from "../constants.mjs";
import { getLoggedInUser } from "../../components/getLoggedInUser.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

/**
 * Fetches all posts from the API and filters them to return only the posts authored by the logged-in user.
 * Returns an array of the user's post data if successful.
 *
 * @async
 * @function getUserPosts
 * @returns {Promise<Array<Object>>} An array of the logged-in user's post data.
 * @throws Will throw an error if the posts retrieval fails or if the user is not logged in.
 *
 * @example
 * getUserPosts()
 *   .then(userPosts => console.log("User's posts fetched:", userPosts))
 *   .catch(error => console.error("Error fetching user's posts:", error));
 */
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
