import { createPost } from "../api/posts/create.mjs";

export function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Hent data fra skjemafeltene
      const postTitle = document.getElementById("postTitle").value;
      const postContent = document.getElementById("postContent").value;
      const tagsInput = document.getElementById("postTags").value;
      const mediaUrl = document.getElementById("postMedia").value;

      // Opprett en array av tagger fra tagsInput
      const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

      // Opprett postdata-objektet
      const postData = {
        title: postTitle,
        body: postContent,
        tags: tagsArray,
        media: mediaUrl,
      };

      try {
        // Opprett innlegget ved hjelp av createPost-funksjonen
        await createPost(postData);

        // Tøm skjemafeltene etter vellykket innsending
        form.reset();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });
  }
}
