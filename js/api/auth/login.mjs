import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import * as components from "../../components/index.mjs";

const action = "/auth/login";
const method = "post";

components.hydrateEmailField();

/**
 * Logs in a user by sending their profile data to the login API endpoint.
 * Saves the access token and user profile to local storage if successful.
 * Redirects to the feed page upon successful login.
 *
 * @async
 * @function login
 * @param {Object} profile - The profile data of the user attempting to log in.
 * @param {string} profile.email - The email of the user.
 * @param {string} profile.password - The password of the user.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 * @throws Will display an alert if the login fails or if there is a network error.
 *
 * @example
 * const userProfile = {
 *   email: "user@example.com",
 *   password: "password123"
 * };
 * login(userProfile);
 */
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
