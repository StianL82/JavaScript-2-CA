import { getPosts } from "../../js/api/posts/read.mjs";
import { updateSortDisplay } from "../handlers/updateSortDisplay.mjs";

// Sort option that uses specific emails to replicate a post-feed for just GrumpyBunch users, a tip I got from Martin.
const emailsToUse = [
  "GrumpyTerron@noroff.no",
  "prettyInStink@noroff.no",
  "angryone@noroff.no",
  "SourWizard@noroff.no",
  "BookwormBelle@noroff.no",
  "FumingPhilosopher@noroff.no",
  "AngryDogLady@noroff.no",
];

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

  updateSortDisplay(filteredPosts);
}
