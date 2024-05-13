import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

export async function removePost(id) {
  const removePostURL = `${API_SOCIAL_URL}${action}/${id}`;
  const response = await authFetch(removePostURL, {
    method,
  });

  console.log("API Response:", response);

  if (!response.ok) {
    throw new Error("Failed to delete post: " + (await response.text()));
  }

  return response.status;
}
