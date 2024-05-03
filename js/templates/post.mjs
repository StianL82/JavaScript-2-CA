import { getProfiles } from "../api/profiles/read.mjs";
import { updateUserData } from "./updateUserData.mjs";
import { defaultAvatar, isValidURL } from "./updateUserData.mjs";

export function postTemplate(postData) {
  const { name, avatar, content, author } = postData;
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
  editIcon.alt = "Edit Post";
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

  // Opprett en ny div for knappen
  const deleteButtonContainer = document.createElement("div");
  deleteButtonContainer.classList.add("d-flex", "align-items-center", "m-2");
  deleteItem.appendChild(deleteButtonContainer);

  // Opprett delete-ikonet
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../images/icon_delete.png";
  deleteIcon.alt = "Delete Post";
  deleteIcon.classList.add("img-fluid", "me-2");
  deleteIcon.style.maxHeight = "1rem";
  deleteButtonContainer.appendChild(deleteIcon);

  // Opprett delete-knappen
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("btn", "btn-primary", "open-modal-button"); // Legg til "open-modal-button" klassen
  deleteButton.textContent = "Delete Post";
  deleteButtonContainer.appendChild(deleteButton);

  // Legg til hendelseslytter for klikk på delete-knappen
  deleteButton.addEventListener("click", function () {
    // Finn modalen ved hjelp av classen og vis den
    var myModal = new bootstrap.Modal(
      document.querySelector(".staticBackdrop")
    );
    myModal.show();
  });

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

  const thumbnailDiv = document.createElement("div");
  thumbnailColumn.appendChild(thumbnailDiv);

  /////////////////////// her må jeg få lagt inn korrekt avatar og name

  const authorAvatar = author.avatar;
  const thumbnailImage = document.createElement("img");

  // Sjekk om forfatterens avatar er tomt, hvis det er tilfelle, bruk defaultAvatar
  if (authorAvatar === "" || !isValidURL(authorAvatar)) {
    thumbnailImage.src = defaultAvatar;
  } else {
    thumbnailImage.src = authorAvatar;
  }

  thumbnailImage.classList.add("profile-avatar", "card-img-top");
  thumbnailImage.alt = "Avatar";
  thumbnailDiv.appendChild(thumbnailImage);

  const authorName = author.name;
  const authorNameContainer = document.createElement("p");
  authorNameContainer.classList.add("text-center", "text-danger", "mt-0");
  authorNameContainer.textContent = authorName; // Bruk forfatterens navn
  thumbnailColumn.appendChild(authorNameContainer);

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
