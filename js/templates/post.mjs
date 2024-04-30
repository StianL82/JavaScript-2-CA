/* export function postTemplateB(postData) {
  return `<div class="post">${postData.title}</div>`;
} */

export function postTemplate(postData) {
  const post = document.createElement("div");
  post.classList.add("post");
  post.innerText = postData.title;

  if (postData.media) {
    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    post.append(img);
  }

  /*   const button = document.createElement("button");
  post.append(button);

  button.addEventListener("click", () => console.log(postData)); */

  return post;
}

export function renderPostTemplate(postData, parent) {
  /*   parent.innerHTML = postTemplate(postData); */

  parent.append(postTemplate(postData));
}
