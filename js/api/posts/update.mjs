import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * Updates an existing post by sending the updated post data to the API.
 * Returns the updated post data if successful.
 *
 * @async
 * @function updatePost
 * @param {Object} postData - The data of the post to be updated.
 * @param {string} postData.title - The updated title of the post.
 * @param {string} postData.body - The updated content of the post.
 * @param {Array<string>} [postData.tags] - Optional updated tags associated with the post.
 * @param {string} [postData.media] - Optional updated media URL associated with the post.
 * @returns {Promise<Object>} The updated post data.
 * @throws Will throw an error if the post update fails.
 *
 * @example
 * const updatedPost = {
 *   title: "Updated Post Title",
 *   body: "This is the updated content of the post.",
 *   tags: ["updatedTag1", "updatedTag2"],
 *   media: "http://example.com/updated-image.jpg"
 * };
 *
 * updatePost(updatedPost)
 *   .then(data => console.log("Post updated:", data))
 *   .catch(error => console.error("Error updating post:", error));
 */
export async function updatePost(postData) {
  const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

  try {
    const response = await authFetch(updatePostURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update the post, status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updatePost:", error);
    throw error;
  }
}
