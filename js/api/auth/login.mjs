import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

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

// Funksjon for å hente innlogget bruker fra lagringen
export function getLoggedInUser() {
  // Hent token og profildata fra lagringen
  const accessToken = storage.load("token");
  const userProfile = storage.load("profile");

  // Sjekk om både token og profildata er tilgjengelig
  if (accessToken && userProfile) {
    // Returner brukerprofilen
    return userProfile;
  } else {
    // Returner null hvis ikke innlogget bruker er tilgjengelig
    return null;
  }
}
/* 
// Eksempel på bruk av getLoggedInUser-funksjonen
const loggedInUser = getLoggedInUser();
if (loggedInUser) {
  console.log("Logged-in user:", loggedInUser);
} else {
  console.log("No logged-in user found.");
} */
