import { postTemplate } from "../templates/post.mjs";

export function updateSortDisplay(filteredPosts) {
  console.log("Updating post display with filtered posts:", filteredPosts);
  const postContainer = document.querySelector("#postsList");
  postContainer.innerHTML = "";

  if (filteredPosts && filteredPosts.length > 0) {
    filteredPosts.forEach((postData) => {
      const postElement = postTemplate(postData);
      postContainer.appendChild(postElement);
    });
  } else {
    const noPostsMessage = document.createElement("h4");
    noPostsMessage.classList.add(
      "no-posts",
      "text-center",
      "bg-info",
      "p-3",
      "text-black",
      "rounded-2"
    );
    noPostsMessage.textContent = "No posts to display.";
    postContainer.appendChild(noPostsMessage);
  }
}
