import * as storage from "../storage/index.mjs";

function updateUsername() {
  const userData = storage.load("profile");

  if (userData && userData.name) {
    const loggedInUsernameElements =
      document.querySelectorAll(".loggedInUsername");
    loggedInUsernameElements.forEach((element) => {
      element.textContent = userData.name;
    });
  } else {
    console.error("Brukernavn ikke tilgjengelig");
  }
}

function updateAvatar() {
  const userData = storage.load("profile");

  if (userData && userData.avatar) {
    const avatarImageElements = document.querySelectorAll(".avatar-image");
    avatarImageElements.forEach((element) => {
      element.src = userData.avatar;
    });
  } else {
    console.error("Avatar ikke tilgjengelig");
  }
}

export function updateUserData() {
  updateUsername();
  updateAvatar();
}
