import * as storage from "../storage/index.mjs";

// Definer defaultAvatar
export const defaultAvatar =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8Mg%3D%3D";

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

export async function updateAvatar() {
  const userData = await storage.load("profile");

  const avatarImageElements = document.querySelectorAll(".avatar-image");
  avatarImageElements.forEach((element) => {
    if (userData && userData.avatar) {
      element.src = userData.avatar;
    } else {
      element.src = defaultAvatar;
    }
  });
}

export function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export async function updateUserData() {
  updateUsername();
  updateAvatar();
}
