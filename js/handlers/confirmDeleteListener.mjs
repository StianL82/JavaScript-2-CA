export function addConfirmDeleteListener(modal, removePost, post) {
  modal.querySelector(".confirm-delete-button").addEventListener(
    "click",
    async function () {
      const postId = this.dataset.postId;
      try {
        const status = await removePost(postId);
        if (status === 200) {
          let myModal = bootstrap.Modal.getInstance(modal);
          myModal.hide();
          post.remove();
          alert("Post deleted successfully!");
        } else {
          alert("Failed to delete post");
        }
      } catch (error) {
        console.error("Deletion error:", error);
        alert("Error: " + (error.message || "Unknown error"));
      }
    },
    { once: true }
  );
}
