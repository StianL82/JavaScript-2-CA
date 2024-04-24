import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { updatePost } from "./api/posts/update.mjs";

const path = location.pathname;

if (path === "/profile/login/") {
  setLoginFormListener();
} else if (path === "/profile/register/") {
  setRegisterFormListener();
}

updatePost({
  id: 11934,
  title: "Denne eksempelposten har blitt oppdatert",
  body: "Det har denne bodyen også",
});
