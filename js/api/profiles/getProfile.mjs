import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const queryParams = "_followers=true&_following=true&_posts=true";

export async function getProfile(name) {
  try {
    const getProfileURL = `${API_SOCIAL_URL}${action}/${name}?${queryParams}`;
    const response = await authFetch(getProfileURL);
    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error("An error occurred while fetching profile:", error);
    throw error;
  }
}
