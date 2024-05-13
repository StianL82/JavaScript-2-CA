import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

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
