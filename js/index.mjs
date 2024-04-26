/* import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as templates from "./templates/index.mjs";

const path = location.pathname;

if (path === "/profile/login/") {
  setLoginFormListener();
} else if (path === "/profile/register/") {
  setRegisterFormListener();
} else if (path === "/feed/") {
  templates.updateUsername();
} else if (path === "/profile/index.html") {
  templates.updateUsername();
} */

/* post.createPost(); */
/* post.updatePost(); */
/* post.deletePost(); */
/* post.getPost(1).then(console.log); */
/* post.getPosts().then(console.log); */

/* async function testTemplates() {
  const posts = await postMethods.getPosts();
  const post = posts[68];
  const container = document.querySelector("#testContainer");
  templates.renderPostTemplates(posts, container);
} */

/* testTemplates(); */

import { router } from "./router.mjs";

await router();
