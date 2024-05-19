import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

/**
 * Creates a new post by sending the post data to the API.
 * Returns the created post data if successful.
 *
 * @async
 * @function createPost
 * @param {Object} postData - The data of the post to be created.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The content of the post.
 * @param {Array<string>} [postData.tags] - Optional tags associated with the post.
 * @param {string} [postData.media] - Optional media URL associated with the post.
 * @returns {Promise<Object>} The created post data.
 * @throws Will throw an error if the post creation fails.
 *
 * @example
 * const newPost = {
 *   title: "My New Post",
 *   body: "This is the content of my new post.",
 *   tags: ["tag1", "tag2"],
 *   media: "http://example.com/image.jpg"
 * };
 *
 * createPost(newPost)
 *   .then(data => console.log("Post created:", data))
 *   .catch(error => console.error("Error creating post:", error));
 */
export async function createPost(postData) {
  const createPostURL = `${API_SOCIAL_URL}${action}?_author=true`;
  try {
    const response = await authFetch(createPostURL, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      console.error(
        "Failed to create post: Server responded with status",
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while creating the post:", error);
    throw error;
  }
}
