import { getPosts } from "../../js/api/posts/read.mjs";
import { postTemplate } from "../templates/post.mjs";

// E-postadresser som skal brukes for filtrering
const emailsToUse = ["GrumpyTerron@noroff.no"];

// Filtrer og vis posts basert på valgt kriterium
export async function filterPosts(filterType = "all") {
  const posts = await getPosts();
  let filteredPosts = [];

  if (Array.isArray(posts)) {
    switch (filterType) {
      case "all":
        filteredPosts = posts;
        break;
      case "hasMedia":
        filteredPosts = posts.filter((post) => post.media);
        break;
      case "grumpyEmail":
        filteredPosts = posts.filter(
          (post) => post.author && emailsToUse.includes(post.author.email)
        );
        break;
      default:
        console.error("Unknown filter type:", filterType);
        filteredPosts = [];
        break;
    }
  } else {
    console.error("Posts is not an array:", posts);
  }

  updatePostDisplay(filteredPosts);
}

// Oppdaterer post-listen basert på filtrering
export function updatePostDisplay(filteredPosts) {
  console.log("Updating post display with filtered posts:", filteredPosts);
  const postContainer = document.querySelector("#postsList");
  postContainer.innerHTML = "";

  if (filteredPosts && filteredPosts.length > 0) {
    filteredPosts.forEach((postData) => {
      const postElement = postTemplate(postData);
      postContainer.appendChild(postElement);
    });
  } else {
    postContainer.innerHTML = "<p>No posts to display.</p>";
  }
}

// Setup sort listener function
export function setupSortListener() {
  document.addEventListener("DOMContentLoaded", () => {
    // Få tak i dropdown elementet
    const sortBy = document.getElementById("sortBy");

    // Sett verdien til 'all'
    if (sortBy) {
      sortBy.value = "all";
      sortBy.addEventListener("change", () => {
        console.log("Sort by changed. New value:", sortBy.value);
        filterPosts(sortBy.value);
      });
    } else {
      console.error("Sort by element not found.");
    }
  });
}
