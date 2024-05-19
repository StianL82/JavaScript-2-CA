import * as storage from "../storage/index.mjs";

export function getLoggedInUser() {
  const accessToken = storage.load("token");
  const userProfile = storage.load("profile");
  if (accessToken && userProfile) {
    return userProfile;
  } else {
    return null;
  }
}
