import * as storage from "../storage/index.mjs";

export function updateUsername() {
  // Hent brukerdata fra lagringen
  const userData = storage.load("profile");

  // Sjekk om brukeren er innlogget og om brukernavnet er tilgjengelig
  if (userData && userData.name) {
    // Hvis brukeren er innlogget og brukernavnet er tilgjengelig, oppdater HTML-elementet
    const loggedInUsernameElement = document.getElementById("loggedInUsername");
    loggedInUsernameElement.textContent = userData.name;
  } else {
    // Hvis brukeren ikke er innlogget eller brukernavnet ikke er tilgjengelig, vis en passende melding
    console.error("Brukernavn ikke tilgjengelig");
  }
}
