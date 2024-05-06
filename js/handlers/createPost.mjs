import { createPost } from "../api/posts/create.mjs";
import { postTemplate } from "../templates/post.mjs"; // Sørger for riktig import

export function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");
  const postsList = document.querySelector("#postsList"); // Sjekker at dette er ID-en for containeren hvor postene vises

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const postTitle = document.getElementById("postTitle").value;
      const postContent = document.getElementById("postContent").value;
      const tagsInput = document.getElementById("postTags").value;
      const mediaUrl = document.getElementById("postMedia").value;
      const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

      const postData = {
        title: postTitle,
        body: postContent,
        tags: tagsArray,
        media: mediaUrl,
      };

      try {
        const newPost = await createPost(postData);
        if (newPost && postsList) {
          const postElement = postTemplate(newPost);
          postsList.insertBefore(postElement, postsList.firstChild); // Legger til den nye posten øverst i listen
          form.reset(); // Tømmer skjemafeltene etter vellykket innsending
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });
  }
}
