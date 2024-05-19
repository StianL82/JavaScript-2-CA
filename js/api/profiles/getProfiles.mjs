import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const queryParams = "_followers=true&_following=true&_posts=true";

export async function getProfiles(limit = 100, offset = 0) {
  try {
    const getProfilesURL = `${API_SOCIAL_URL}${action}?${queryParams}&limit=${limit}&offset=${offset}`;
    const response = await authFetch(getProfilesURL);
    const profiles = await response.json();
    return profiles;
  } catch (error) {
    console.error("An error occurred while fetching profiles:", error);
    throw error;
  }
}
