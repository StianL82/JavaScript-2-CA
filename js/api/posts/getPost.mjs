import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

export async function getPost(id) {
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true`;
  const response = await authFetch(getPostURL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch post with ID ${id}, received status ${response.status}`
    );
  }
  return await response.json();
}
