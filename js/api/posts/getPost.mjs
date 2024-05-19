import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

/**
 * Fetches a post by its ID from the API, including author details.
 * Returns the post data if successful.
 *
 * @async
 * @function getPost
 * @param {string} id - The ID of the post to be fetched.
 * @returns {Promise<Object>} The fetched post data.
 * @throws Will throw an error if the post retrieval fails.
 *
 * @example
 * const postId = "12345";
 *
 * getPost(postId)
 *   .then(post => console.log("Post fetched:", post))
 *   .catch(error => console.error("Error fetching post:", error));
 */
export async function getPost(id) {
  try {
    const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true`;
    const response = await authFetch(getPostURL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post with ID ${id}, received status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred while fetching the post:", error);
    throw error;
  }
}
