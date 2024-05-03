import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";

export async function getPosts() {
  const getPostsURL = `${API_SOCIAL_URL}${action}?_author=true`;

  const response = await authFetch(getPostsURL);

  return await response.json();
}

export async function getPost(id) {
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true`;

  const response = await authFetch(getPostURL);

  return await response.json();
}
