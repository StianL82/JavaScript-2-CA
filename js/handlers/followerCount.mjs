import { getLoggedInUser } from "../components/getLoggedInUser.mjs";
import { getProfile } from "../api/profiles/getProfile.mjs";

export async function updateFollowerCount() {
  try {
    const loggedInUser = getLoggedInUser();

    if (loggedInUser && loggedInUser.name) {
      const profile = await getProfile(loggedInUser.name);

      const followersCountElement = document.querySelector("#followers-count");
      if (followersCountElement && profile && profile.followers) {
        followersCountElement.textContent = `Followers: ${profile.followers.length}`;
      } else if (followersCountElement) {
        followersCountElement.textContent = "Followers: 0";
      } else {
        console.error("Followers count element not found on the page.");
      }
    } else {
      console.error("Logged in user not found or missing necessary data.");
    }
  } catch (error) {
    console.error("Failed to update followers count", error);
  }
}
