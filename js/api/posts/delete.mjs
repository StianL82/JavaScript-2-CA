import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

/**
 * Deletes a post by its ID by sending a delete request to the API.
 * Returns the status code of the response if successful.
 *
 * @async
 * @function removePost
 * @param {string} id - The ID of the post to be deleted.
 * @returns {Promise<number>} The status code of the response.
 * @throws Will throw an error if the post deletion fails.
 *
 * @example
 * const postId = "12345";
 *
 * removePost(postId)
 *   .then(status => console.log("Post deleted with status:", status))
 *   .catch(error => console.error("Error deleting post:", error));
 */
export async function removePost(id) {
  try {
    const removePostURL = `${API_SOCIAL_URL}${action}/${id}`;
    const response = await authFetch(removePostURL, {
      method,
    });

    if (!response.ok) {
      throw new Error("Failed to delete post: " + (await response.text()));
    }

    return response.status;
  } catch (error) {
    console.error("An error occurred while deleting the post:", error);
    throw error;
  }
}
