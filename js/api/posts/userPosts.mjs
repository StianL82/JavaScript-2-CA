import { API_SOCIAL_URL } from "../constants.mjs";
import { getLoggedInUser } from "../auth/login.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";

export async function getUserPosts() {
  const userProfile = getLoggedInUser(); // Anta at denne funksjonen er importert fra et sted
  if (!userProfile) {
    return []; // Ingen innlogget bruker, ingen poster å vise
  }

  const getPostsURL = `${API_SOCIAL_URL}${action}?_author=true`;
  const response = await authFetch(getPostsURL);
  const posts = await response.json();

  // Filtrer poster til bare de som er laget av innlogget bruker
  return posts.filter((post) => post.author.name === userProfile.name);
}
