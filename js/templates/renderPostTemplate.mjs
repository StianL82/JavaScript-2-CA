import { postTemplate } from "./post.mjs";

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}
