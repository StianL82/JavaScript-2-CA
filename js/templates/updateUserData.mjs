import * as storage from "../storage/index.mjs";

// Default Avatar
export const defaultAvatar =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8Mg%3D%3D";

// Default banner
export const defaultBanner =
  "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";

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

async function updateAvatar() {
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

async function updateBanner() {
  const userData = await storage.load("profile");

  const bannerImageElement = document.querySelector(".banner-image");
  if (!bannerImageElement) {
    console.log("Banner image element not found on this page.");
    return; // Avslutter funksjonen tidlig hvis elementet ikke finnes
  }

  // Hvis vi kommer hit, eksisterer bannerImageElement
  if (userData && userData.banner && isValidURL(userData.banner)) {
    bannerImageElement.src = userData.banner;
  } else {
    bannerImageElement.src = defaultBanner;
  }
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
  const bannerImageElement = document.querySelector(".banner-image");
  const avatarImageElements = document.querySelectorAll(".avatar-image");
  const loggedInUsernameElements =
    document.querySelectorAll(".loggedInUsername");

  if (avatarImageElements.length > 0) {
    updateAvatar(); // Oppdaterer kun avatar hvis avatar-elementer er til stede
  }

  if (loggedInUsernameElements.length > 0) {
    updateUsername(); // Oppdaterer kun brukernavn hvis brukernavn-elementer er til stede
  }

  if (bannerImageElement) {
    updateBanner(); // Oppdaterer kun banner hvis banner-elementet er til stede
  }
}
