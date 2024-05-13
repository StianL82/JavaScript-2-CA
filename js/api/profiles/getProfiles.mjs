import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

export async function getProfiles() {
  try {
    const getProfilesURL = `${API_SOCIAL_URL}${action}`;
    const response = await authFetch(getProfilesURL);

    return await response.json();
  } catch (error) {
    console.error("An error occurred while fetching profiles:", error);
    throw error;
  }
}
