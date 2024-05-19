import * as storage from "../../storage/index.mjs";
import { API_SOCIAL_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

/**
 * Registers a new user by sending their profile data to the registration API endpoint.
 * Saves the user profile to local storage if successful.
 * Sets the user email in session storage and redirects to the login page upon successful registration.
 *
 * @async
 * @function register
 * @param {Object} profile - The profile data of the user attempting to register.
 * @param {string} profile.name - The name of the user.
 * @param {string} profile.email - The email of the user.
 * @param {string} profile.password - The password of the user.
 * @returns {Promise<void>} - A promise that resolves when the registration process is complete.
 * @throws Will display an alert if the registration fails or if there is a network error.
 *
 * @example
 * const newUserProfile = {
 *   name: "Ola Nordmann",
 *   email: "ola@example.com",
 *   password: "testpassword"
 * };
 * register(newUserProfile);
 */
export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
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

      sessionStorage.setItem("userEmail", userData.email);

      alert("Registration successful! Please log in to continue.");
      window.location.href = "../../../profile/login/";
    } else {
      const errorMessage = await response.text();
      if (response.status >= 400 && response.status < 500) {
        alert(
          `Client error occurred: ${errorMessage}. Please check your input and try again.`
        );
      } else {
        alert("Registration failed: " + errorMessage);
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
