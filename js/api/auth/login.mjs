import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

// Funksjon for å hydrere e-postfeltet på innloggingssiden
function hydrateEmailField() {
  document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const storedEmail = sessionStorage.getItem("userEmail");

    if (emailInput && storedEmail) {
      emailInput.value = storedEmail; // Sett den lagrede e-postadressen i skjemaet
      sessionStorage.removeItem("userEmail"); // Fjern e-postadressen fra sessionStorage etter den er brukt
    }
  });
}

// Kall hydrateEmailField for å sikre at den kjøres ved siden lasting
hydrateEmailField();

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (response.ok) {
      const { accessToken, ...user } = await response.json();
      storage.save("token", accessToken);
      storage.save("profile", user);
      window.location.href = "../../../feed/";
    } else {
      alert(
        "Login failed. Please check your that your email or password is correct."
      );
    }
  } catch (error) {
    console.error("Network error:", error);
    alert(
      "Network error. Please check your internet connection and try again."
    );
  }
}

export function getLoggedInUser() {
  const accessToken = storage.load("token");
  const userProfile = storage.load("profile");
  if (accessToken && userProfile) {
    return userProfile;
  } else {
    return null;
  }
}
