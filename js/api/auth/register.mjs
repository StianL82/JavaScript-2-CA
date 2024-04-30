import * as storage from "../../storage/index.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = "/auth/register"; // Definer handlingen (endpoint) for registrering
const method = "post"; // Definer HTTP-metoden som skal brukes for registrering

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action; // Bygg full URL for registrering
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (response.ok) {
      // Hvis registreringen er vellykket, lagre brukerdataene lokalt
      const userData = await response.json();
      storage.save("profile", userData);

      // Vis en bekreftelsesmelding
      alert("Registration successful! Please log in to continue.");

      // Omdiriger til innloggingssiden
      window.location.href = "../../../profile/login/"; // Endre URL-en til din innloggingssides URL
    } else {
      const errorMessage = await response.text();
      if (response.status === 400) {
        // Kontoen eksisterer allerede, vis en passende melding
        alert("Account already exists. Please log in instead.");
      } else {
        // Annen feil, vis en passende feilmelding
        alert("Registration failed: " + errorMessage);
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
