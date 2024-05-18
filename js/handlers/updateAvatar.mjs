import * as storage from "../storage/index.mjs";

// Default Avatar
export const defaultAvatar =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8Mg%3D%3D";

export async function updateAvatar() {
  try {
    const userData = await storage.load("profile");
    const avatarImageElements = document.querySelectorAll(".avatar-image");

    avatarImageElements.forEach((element) => {
      if (userData && userData.avatar) {
        element.src = userData.avatar;
      } else {
        element.src = defaultAvatar;
      }
    });
  } catch (error) {
    console.error("Error loading profile data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateAvatar();
});
