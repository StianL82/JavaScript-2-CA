import { getProfiles } from "../api/profiles/read.mjs";
import { updateUserData } from "./updateUserData.mjs";

export function postTemplate(postData) {
  const { name, avatar, content } = postData;
  const post = document.createElement("div");
  post.classList.add("card", "mb-4", "bg-info", "text-black");

  const dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add(
    "d-flex",
    "justify-content-end",
    "me-3",
    "position-relative"
  );
  post.appendChild(dropdownContainer);

  const dotsIcon = document.createElement("img");
  dotsIcon.src = "../images/icon_dots.png";
  dotsIcon.classList.add("dropdown-toggle");
  dotsIcon.role = "button";
  dotsIcon.setAttribute("data-bs-toggle", "dropdown");
  dotsIcon.setAttribute("aria-expanded", "false");
  dotsIcon.alt = "Three dotted icon";
  dropdownContainer.appendChild(dotsIcon);

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu", "dropdown-menu-end");
  dropdownContainer.appendChild(dropdownMenu);

  const editItem = document.createElement("li");
  editItem.classList.add("d-flex");
  dropdownMenu.appendChild(editItem);

  const editContainer = document.createElement("div");
  editContainer.classList.add("d-flex", "align-items-center", "m-2");
  editItem.appendChild(editContainer);

  const editIcon = document.createElement("img");
  editIcon.src = "../images/icon_edit.png";
  editIcon.alt = "";
  editIcon.classList.add("img-fluid", "me-2");
  editIcon.style.maxHeight = "1rem";
  editContainer.appendChild(editIcon);

  const editText = document.createElement("p");
  editText.classList.add("m-0");
  editText.textContent = "Edit Post";
  editContainer.appendChild(editText);

  const deleteItem = document.createElement("li");
  deleteItem.classList.add("d-flex");
  dropdownMenu.appendChild(deleteItem);

  const deleteContainer = document.createElement("div");
  deleteContainer.classList.add("d-flex", "align-items-center", "m-2");
  deleteItem.appendChild(deleteContainer);

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../images/icon_delete.png";
  deleteIcon.alt = "";
  deleteIcon.classList.add("img-fluid", "me-2");
  deleteIcon.style.maxHeight = "1rem";
  deleteContainer.appendChild(deleteIcon);

  const deleteText = document.createElement("p");
  deleteText.classList.add("m-0");
  deleteText.textContent = "Delete Post";
  deleteContainer.appendChild(deleteText);

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  post.appendChild(rowDiv);

  const thumbnailColumn = document.createElement("div");
  thumbnailColumn.classList.add(
    "col-sm-4",
    "col-md-3",
    "col-lg-2",
    "d-flex",
    "flex-column",
    "align-items-center",
    "justify-content-center"
  );
  rowDiv.appendChild(thumbnailColumn);

  /////////////////////// her må jeg få lagt inn korrekt avatar og name

  const thumbnailDiv = document.createElement("div");
  thumbnailColumn.appendChild(thumbnailDiv);

  const thumbnailImage = document.createElement("img");
  thumbnailImage.src = "../images/latest_post_1.png";
  thumbnailImage.classList.add("card-img-top", "img-fluid", "p-3", "pb-0");
  thumbnailImage.alt = "Thumbnail 1";
  thumbnailDiv.appendChild(thumbnailImage);

  const authorName = document.createElement("p");
  authorName.classList.add("text-center", "text-danger");
  authorName.textContent = "Example Data";
  thumbnailColumn.appendChild(authorName);

  const bodyColumn = document.createElement("div");
  bodyColumn.classList.add(
    "card-body",
    "col-sm-8",
    "col-md-9",
    "d-flex",
    "flex-column",
    "align-items-stretch"
  );
  rowDiv.appendChild(bodyColumn);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add(
    "d-flex-column",
    "border",
    "border-dark",
    "rounded-2",
    "m-2",
    "bg-custom-light-grey"
  );
  bodyColumn.appendChild(contentDiv);

  const title = document.createElement("h4");
  title.classList.add("card-title", "mb-3", "p-2");
  title.textContent = postData.title;
  contentDiv.appendChild(title);

  const postText = document.createElement("p");
  postText.classList.add("card-text", "p-2");
  postText.textContent = postData.body;
  contentDiv.appendChild(postText);

  if (postData.media) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("post-image-container"); // Legg til klassen for bildet container
    contentDiv.appendChild(imgContainer);

    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    img.classList.add("post-image"); // Legg til klassen for bildet
    imgContainer.appendChild(img); // Legg til bildet i imgContainer
  }

  const commentDiv = document.createElement("div");
  commentDiv.classList.add(
    "d-flex",
    "justify-content-end",
    "gap-4",
    "me-3",
    "mt-2",
    "align-items-center"
  );
  bodyColumn.appendChild(commentDiv);

  const commentIconContainer = document.createElement("div");
  commentDiv.appendChild(commentIconContainer);

  const commentIcon = document.createElement("img");
  commentIcon.src = "../images/icon_comment.png";
  commentIcon.classList.add("icon-small");
  commentIcon.alt = "comment icon";
  commentIconContainer.appendChild(commentIcon);

  /*   post.innerText = postData.title; */

  /*   if (postData.media) {
    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    post.append(img);
  } */

  return post;
}

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}
