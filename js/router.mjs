import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as templates from "./templates/index.mjs";

const path = location.pathname;

export async function router() {
  switch (path) {
    //Register Page
    case "/profile/register/":
    case "/profile/register":
    case "/profile/register.html":
      setRegisterFormListener();
      break;
    //Login Page
    case "/profile/login/":
    case "/profile/login":
    case "/profile/login.html":
      setLoginFormListener();
      break;
    //FeedPage
    case "/feed/":
    case "/feed":
    case "/feed.html":
    case "/feed/index.html":
      templates.updateUsername();
      break;
    //Profile Page
    case "/profile/":
    case "/profile":
    case "/profile.html":
    case "/profile/index.html":
      templates.updateUsername();
      break;

    default:
      console.log("404 - not found");
  }
}
