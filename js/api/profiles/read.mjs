import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

export async function getProfiles() {
  const getProfilesURL = `${API_SOCIAL_URL}${action}`;

  const response = await authFetch(getProfilesURL);

  return await response.json();
}

export async function getProfile(name = load("profile").name) {
  const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;

  const response = await authFetch(getProfileURL);

  return await response.json();
}
