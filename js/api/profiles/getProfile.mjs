import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

export async function getProfile(name) {
  const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;
  const response = await authFetch(getProfileURL);

  return await response.json();
}
