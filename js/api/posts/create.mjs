import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
  // Legger til en forespørselparameter for å inkludere forfatterdata hvis APIet støtter det
  const createPostURL = `${API_SOCIAL_URL}${action}?_author=true`;

  const response = await authFetch(createPostURL, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    console.error(
      "Failed to create post: Server responded with status",
      response.status
    );
    return null;
  }

  const data = await response.json();
  console.log(data); // Logger data for å sjekke hva som returneres

  return data;
}
