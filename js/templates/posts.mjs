import { postTemplate } from "./post.mjs";
import * as postMethods from "../api/posts/index.mjs";
import * as templates from "../templates/index.mjs";

async function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}

export async function renderPosts() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#postsList");
  renderPostTemplates(posts, container);
}
