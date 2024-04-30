import * as templates from "./templates/index.mjs";
import * as handlers from "./handlers/index.mjs";

const path = location.pathname;

export async function router() {
  switch (path) {
    //Register Page
    case "/profile/register/":
    case "/profile/register":
    case "/profile/register.html":
      handlers.setRegisterFormListener();
      break;
    //Login Page
    case "/profile/login/":
    case "/profile/login":
    case "/profile/login.html":
    case "/profile/login/index.html":
      handlers.setLoginFormListener();
      break;
    //FeedPage
    case "/feed/":
    case "/feed":
    case "/feed.html":
    case "/feed/index.html":
      templates.updateUserData();
      handlers.setCreatePostFormListener();
      break;
    //Update Post Page
    case "/feed/edit/":
    case "/feed/edit":
    case "/feed/edit.html":
    case "/feed/edit.html":
      templates.updateUserData();
      handlers.setUpdatePostFormListener();
      break;
    //Profile Page
    case "/profile/":
    case "/profile":
    case "/profile.html":
    case "/profile/index.html":
      templates.updateUserData();
      break;
    //Profile Edit
    case "/profile/edit/":
    case "/profile/edit":
    case "/profile/edit.html":
    case "/profile/edit/index.html":
      templates.updateUserData();
      handlers.setUpdateProfileListener();
      break;

    default:
      console.log("404 - not found");
  }
}
