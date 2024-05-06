import { getPost, updatePost } from "../api/posts/index.mjs";

export async function setUpdatePostFormListener() {
  const form = document.querySelector("#updatePost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const button = form.querySelector("button");
    button.disabled = true;

    const post = await getPost(id);

    form.title.value = post.title;
    form.body.value = post.body;
    form.tags.value = post.tags;
    form.media.value = post.media;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const post = {
        id: id, // Sørg for at denne ID-en hentes korrekt og er gyldig
      };

      for (let [key, value] of formData.entries()) {
        post[key] =
          key === "tags" ? value.split(",").map((tag) => tag.trim()) : value;
      }

      try {
        const result = await updatePost(post);
        if (result) {
          console.log("Post updated successfully!");
          const returnUrl =
            sessionStorage.getItem("returnUrl") || "/defaultPath";
          sessionStorage.removeItem("returnUrl"); // Fjern brukte data fra sessionStorage
          window.location.href = returnUrl + "?updated=true"; // Naviger tilbake med oppdateringsparameter
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    });
  }
}
