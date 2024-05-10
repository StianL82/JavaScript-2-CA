import { postTemplate } from "./post.mjs";
import * as postMethods from "../api/posts/index.mjs";

async function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}

export async function renderPosts() {
  const container = document.querySelector("#postsList");

  try {
    // Forsøker å hente innlegg
    const posts = await postMethods.getPosts();

    // Renser tidligere innhold i containeren
    container.innerHTML = "";

    // Kaller en funksjon for å renderere hentede innlegg
    renderPostTemplates(posts, container);
  } catch (error) {
    // Logger feilen og viser en feilmelding i brukergrensesnittet
    console.error("Failed to load posts:", error);
    container.innerHTML =
      '<div class="alert alert-danger">Unable to load posts. Please try again later.</div>';
  } finally {
    // Logger en melding om at forsøket på å rendre innlegg er fullført
    console.log("Attempt to render posts has completed.");
    // Eventuell opprydding eller ekstra funksjoner som alltid må kjøres kan legges her
  }
}
