import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

export async function updateProfile(profileData) {
  try {
    const updateProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}/media`;

    const response = await authFetch(updateProfileURL, {
      method,
      body: JSON.stringify(profileData),
    });

    return await response.json();
  } catch (error) {
    console.error("An error occurred while updating profile:", error);
    throw error;
  }
}
