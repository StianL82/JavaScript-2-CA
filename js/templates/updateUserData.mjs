import { updateUsername } from "../handlers/updateUsername.mjs";
import { updateAvatar } from "../handlers/updateAvatar.mjs";
import { updateBanner } from "../handlers/updateBanner.mjs";

export async function updateUserData() {
  const bannerImageElement = document.querySelector(".banner-image");
  const avatarImageElements = document.querySelectorAll(".avatar-image");
  const loggedInUsernameElements =
    document.querySelectorAll(".loggedInUsername");

  if (avatarImageElements.length > 0) {
    updateAvatar();
  }

  if (loggedInUsernameElements.length > 0) {
    updateUsername();
  }

  if (bannerImageElement) {
    updateBanner();
  }
}
