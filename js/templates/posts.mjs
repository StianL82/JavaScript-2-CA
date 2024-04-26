import { postTemplate } from "./post.mjs";

export async function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}
