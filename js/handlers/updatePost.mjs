import { getPost, updatePost } from "../api/posts/index.mjs";

export async function setUpdatePostFormListener() {
  const form = document.querySelector("#updatePost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const post = await getPost(id);

    form.title.value = post.title;
    form.body.value = post.body;
    form.tags.value = post.tags;
    form.media.value = post.media;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const post = {};

      // Legg til ID til post-objektet
      post.id = id;

      // Legg til resten av feltene fra skjemaet til post-objektet
      for (let [key, value] of formData.entries()) {
        if (key === "tags") {
          // Hvis feltet er "tags", formatere verdien som en array
          post[key] = value.split(",").map((tag) => tag.trim());
        } else {
          post[key] = value;
        }
      }

      try {
        // Oppdater innlegget ved hjelp av updatePost-funksjonen
        await updatePost(post);

        // Eventuelt gi tilbakemelding om vellykket oppdatering
        console.log("Post updated successfully!");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    });
  }
}
