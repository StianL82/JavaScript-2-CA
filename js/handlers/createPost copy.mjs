import { createPost } from "../api/posts/create.mjs";
import { renderPostTemplate } from "../templates/post.mjs";

export function setupAddPostFormListener() {
  const form = document.querySelector("#addPost");
  const createdPostsSection = document.getElementById("createdPosts");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;

    const postData = {
      title: postTitle,
      content: postContent,
    };

    try {
      const createdPostData = await createPost(postData);
      renderPostTemplate(createdPostData, createdPostsSection);

      // Optionally, clear the form fields after successful submission
      form.reset();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  });
}
