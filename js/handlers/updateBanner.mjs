import * as storage from "../storage/index.mjs";
import { isValidURL } from "../components/validURL.mjs";

// Default banner
export const defaultBanner =
  "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";

export async function updateBanner() {
  const userData = await storage.load("profile");

  const bannerImageElement = document.querySelector(".banner-image");
  if (!bannerImageElement) {
    console.log("Banner image element not found on this page.");
    return;
  }

  if (userData && userData.banner && isValidURL(userData.banner)) {
    bannerImageElement.src = userData.banner;
  } else {
    bannerImageElement.src = defaultBanner;
  }
}
