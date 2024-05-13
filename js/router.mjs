import * as templates from "./templates/index.mjs";
import * as handlers from "./handlers/index.mjs";
import * as posts from "./api/posts/index.mjs";
import * as profiles from "./api/profiles/index.mjs";
import * as components from "./components/index.mjs";

const path = location.pathname;

export async function router() {
  handlers.setupLogoutButton();

  switch (path) {
    //Main Page
    case "/":
    case "/index":
    case "/index.html":
      break;
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
      await templates.updateUserData();
      templates.renderPosts();
      /*       posts.getPosts().then(console.log);
      profiles.getProfiles().then(console.log); */
      handlers.setCreatePostFormListener();
      /*       handlers.handleDeletePost(); */
      handlers.setupSearchListener();
      components.filterPosts();
      handlers.updateSortDisplay();
      handlers.setupSortListener();
      break;
    //Single Post Page
    case "/feed/post/":
    case "/feed/post":
    case "/feed/post.html":
    case "/feed/post/index.html":
      templates.updateUserData();
      const postId = window.location.pathname.split("/").pop(); // Henter ID fra URL
      await templates.renderSinglePost(postId);
      break;
    //Update Post Page
    case "/feed/edit/":
    case "/feed/edit":
    case "/feed/edit.html":
    case "/feed/edit.html":
      await templates.updateUserData();
      handlers.setUpdatePostFormListener();
      break;
    //Profile Page
    case "/profile/":
    case "/profile":
    case "/profile.html":
    case "/profile/index.html":
      await templates.updateUserData();
      templates.renderUserPosts();
      break;
    //Profile Edit
    case "/profile/edit/":
    case "/profile/edit":
    case "/profile/edit.html":
    case "/profile/edit/index.html":
      await templates.updateUserData();
      handlers.setUpdateProfileListener();
      break;

    default:
      console.log("404 - not found");
  }
}
