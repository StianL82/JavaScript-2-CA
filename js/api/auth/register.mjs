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
      const userData = await response.json();
      storage.save("profile", userData);

      // Lagrer e-postadressen i sessionStorage
      sessionStorage.setItem("userEmail", userData.email);

      alert("Registration successful! Please log in to continue.");
      window.location.href = "../../../profile/login/";
    } else {
      const errorMessage = await response.text();
      if (response.status >= 400 && response.status < 500) {
        // Klient-side feil, spesifiser melding basert på vanlige årsaker
        alert(
          `Client error occurred: ${errorMessage}. Please check your input and try again.`
        );
      } else {
        // Server-side feil eller annen type feil, vis en passende feilmelding
        alert("Registration failed: " + errorMessage);
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
