/* export function postTemplateB(postData) {
  return `<div class="post">${postData.title}</div>`;
} */

export function postTemplate(postData) {
  const post = document.createElement("div");
  post.classList.add("post");
  post.innerText = postData.title;
  const button = document.createElement("button");
  post.append(button);

  button.addEventListener("click", () => console.log(postData));

  return post;
}

export function renderPostTemplate(postData, parent) {
  /*   parent.innerHTML = postTemplate(postData); */

  parent.append(postTemplate(postData));
}
