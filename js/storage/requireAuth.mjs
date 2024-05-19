import { isAuthenticated } from "./isAuthenticated.mjs";

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "/profile/login/";
  }
}
