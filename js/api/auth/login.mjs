import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import * as components from "../../components/index.mjs";

const action = "/auth/login";
const method = "post";

components.hydrateEmailField();

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
        "Login failed. Please check that your email or password is correct."
      );
    }
  } catch (error) {
    console.error("Network error:", error);
    alert(
      "Network error. Please check your internet connection and try again."
    );
  }
}
