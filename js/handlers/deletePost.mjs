/* import { removePost } from "../api/posts/delete.mjs";

export async function handleDeletePost(postId) {
  try {
    // Kall på en funksjon som sletter posten ved hjelp av post-ID
    await removePost(postId);

    // Lukk modalen etter at posten er slettet
    const modal = new bootstrap.Modal(
      document.querySelector(".staticBackdrop")
    );
    modal.hide();

    // Fjern posten fra DOM-en hvis nødvendig
    // (Dette avhenger av hvordan du håndterer oppdateringen av postene i DOM-en etter sletting)
  } catch (error) {
    console.error("Error deleting post:", error);
  }
} */
