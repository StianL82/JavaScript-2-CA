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

export async function updateAvatar() {
  const userData = await storage.load("profile");
  const defaultAvatar =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8Mg%3D%3D";

  const avatarImageElements = document.querySelectorAll(".avatar-image");
  avatarImageElements.forEach((element) => {
    if (userData && userData.avatar) {
      element.src = userData.avatar;
    } else {
      element.src = defaultAvatar;
    }
  });
}

export async function updateUserData() {
  updateUsername();
  updateAvatar();
}
