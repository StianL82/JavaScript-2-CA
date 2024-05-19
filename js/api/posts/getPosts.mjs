import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

/**
 * Fetches all posts from the API, including author details.
 * Returns an array of post data if successful.
 *
 * @async
 * @function getPosts
 * @returns {Promise<Array<Object>>} An array of fetched post data.
 * @throws Will throw an error if the posts retrieval fails.
 *
 * @example
 * getPosts()
 *   .then(posts => console.log("Posts fetched:", posts))
 *   .catch(error => console.error("Error fetching posts:", error));
 */
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
