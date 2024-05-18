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
        id: id,
      };

      for (let [key, value] of formData.entries()) {
        post[key] =
          key === "tags" ? value.split(",").map((tag) => tag.trim()) : value;
      }

      try {
        const result = await updatePost(post);
        if (result) {
          const previousUrl = document.referrer;

          let returnUrl;
          if (previousUrl.includes("/feed/post/?id=")) {
            returnUrl = "/profile";
          } else {
            returnUrl =
              sessionStorage.getItem("returnUrl") ||
              previousUrl ||
              "/defaultPath";
          }

          sessionStorage.removeItem("returnUrl");
          window.location.href = returnUrl;
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    });
  }
}
