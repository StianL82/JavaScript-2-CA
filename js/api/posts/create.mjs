import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

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
