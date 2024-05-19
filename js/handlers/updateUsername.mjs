import * as storage from "../storage/index.mjs";

export function updateUsername() {
  const userData = storage.load("profile");

  if (userData && userData.name) {
    const loggedInUsernameElements =
      document.querySelectorAll(".loggedInUsername");
    loggedInUsernameElements.forEach((element) => {
      element.textContent = userData.name;
    });
  } else {
    console.error("Username not available");
  }
}
