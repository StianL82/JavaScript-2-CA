import { defaultAvatar } from "../handlers/updateAvatar.mjs";
import { removePost } from "../api/posts/delete.mjs";
import { getLoggedInUser } from "../components/getLoggedInUser.mjs";
import { isValidURL } from "../components/validURL.mjs";
import { addEditButtonListener } from "../handlers/editButtonListener.mjs";
import { addDeleteButtonListener } from "../handlers/deleteButtonListener.mjs";
import { addConfirmDeleteListener } from "../handlers/confirmDeleteListener.mjs";

export function postTemplate(postData) {
  const { id, author } = postData;
  const loggedInUser = getLoggedInUser();
  const isAuthorLoggedIn = loggedInUser && loggedInUser.name === author.name;

  const post = document.createElement("div");
  post.classList.add("card", "mb-4", "bg-info", "text-black");

  if (isAuthorLoggedIn) {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add(
      "d-flex",
      "justify-content-end",
      "me-3",
      "position-relative"
    );
    post.appendChild(dropdownContainer);

    const dotsIcon = document.createElement("img");
    dotsIcon.src = "/images/icon_dots.png";
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
    editIcon.src = "/images/icon_edit.png";
    editIcon.alt = "Edit Post";
    editIcon.classList.add("img-fluid", "me-2");
    editIcon.style.maxHeight = "1rem";
    editContainer.appendChild(editIcon);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("btn", "btn-warning", "edit-post-button");
    editButton.textContent = "Edit Post";
    editContainer.appendChild(editButton);

    addEditButtonListener(editButton, postData);

    const deleteItem = document.createElement("li");
    deleteItem.classList.add("d-flex");
    dropdownMenu.appendChild(deleteItem);

    const deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.classList.add("d-flex", "align-items-center", "m-2");
    deleteItem.appendChild(deleteButtonContainer);

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "/images/icon_delete.png";
    deleteIcon.alt = "Delete Post";
    deleteIcon.classList.add("img-fluid", "me-2");
    deleteIcon.style.maxHeight = "1rem";
    deleteButtonContainer.appendChild(deleteIcon);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-primary", "open-modal-button");
    deleteButton.textContent = "Delete Post";
    deleteButtonContainer.appendChild(deleteButton);

    const modal = document.createElement("div");
    modal.classList.add("modal", "fade", "staticBackdrop");
    modal.setAttribute("data-bs-backdrop", "static");
    modal.setAttribute("data-bs-keyboard", "false");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "staticBackdropLabel");
    modal.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    const modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title", "fs-5");
    modalTitle.textContent = "Delete Post";
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.textContent = "Are you sure you want to delete the post?";

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    const closeButtonModal = document.createElement("button");
    closeButtonModal.type = "button";
    closeButtonModal.classList.add("btn", "btn-secondary");
    closeButtonModal.setAttribute("data-bs-dismiss", "modal");
    closeButtonModal.textContent = "Close";
    const deleteButtonModal = document.createElement("button");
    deleteButtonModal.type = "button";
    deleteButtonModal.classList.add(
      "btn",
      "btn-danger",
      "confirm-delete-button"
    );
    deleteButtonModal.textContent = "Delete Post";
    modalFooter.appendChild(closeButtonModal);
    modalFooter.appendChild(deleteButtonModal);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    post.appendChild(modal);

    addDeleteButtonListener(deleteButton, modal, id);
    addConfirmDeleteListener(modal, removePost, post);
  }

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  post.appendChild(rowDiv);

  const thumbnailColumn = document.createElement("div");
  thumbnailColumn.classList.add(
    "col-sm-3",
    "col-md-3",
    "col-lg-2",
    "ps-sm-4",
    "ps-md-5",
    "d-flex",
    "flex-column",
    "align-items-center",
    "justify-content-center"
  );
  rowDiv.appendChild(thumbnailColumn);

  const thumbnailDiv = document.createElement("div");
  thumbnailColumn.appendChild(thumbnailDiv);

  const authorAvatar = author.avatar;
  const thumbnailImage = document.createElement("img");

  if (authorAvatar === "" || !isValidURL(authorAvatar)) {
    thumbnailImage.src = defaultAvatar;
  } else {
    thumbnailImage.src = authorAvatar;
  }

  thumbnailImage.classList.add("profile-avatar", "card-img-top", "mt-3");
  thumbnailImage.alt = "Avatar from the logged in User";
  thumbnailDiv.appendChild(thumbnailImage);

  const authorName = author.name;
  const authorNameContainer = document.createElement("p");
  authorNameContainer.classList.add(
    "author-name",
    "text-center",
    "text-danger",
    "mt-0"
  );
  authorNameContainer.textContent = authorName;
  thumbnailColumn.appendChild(authorNameContainer);

  const bodyColumn = document.createElement("div");
  bodyColumn.classList.add(
    "card-body",
    "col-sm-9",
    "col-md-9",
    "d-flex",
    "flex-column",
    "align-items-stretch"
  );
  rowDiv.appendChild(bodyColumn);

  const dateDiv = document.createElement("div");
  dateDiv.classList.add("date-info", "mb-2", "ms-2");

  const createdDate = new Date(postData.created);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  });
  dateDiv.textContent = `${dateFormatter.format(createdDate)}`;

  if (postData.updated && postData.updated !== postData.created) {
    const updatedDate = new Date(postData.updated);
    dateDiv.textContent += ` | Updated: ${dateFormatter.format(updatedDate)}`;
  }

  bodyColumn.appendChild(dateDiv);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add(
    "d-flex-column",
    "border",
    "border-dark",
    "rounded-2",
    "m-2",
    "bg-custom-light-grey"
  );
  contentDiv.style.cursor = "pointer";
  contentDiv.addEventListener("click", () => {
    window.location.href = `/feed/post/?id=${postData.id}`;
  });
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
    imgContainer.classList.add("post-image-container");
    contentDiv.appendChild(imgContainer);

    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    img.classList.add("post-image");
    imgContainer.appendChild(img);
  }

  if (postData.tags && postData.tags.length > 0) {
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add(
      "d-flex",
      "flex-wrap",
      "justify-content-start",
      "gap-2",
      "ms-2"
    );
    contentDiv.appendChild(tagsContainer);

    postData.tags.forEach((tag) => {
      if (tag) {
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        ("tag");
        tagElement.textContent = `#${tag}`;
        tagsContainer.appendChild(tagElement);
      }
    });
  }

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mt-2"
  );

  const reactionDiv = document.createElement("div");
  reactionDiv.classList.add("d-flex", "align-items-center", "gap-2");

  const reactionIcon = document.createElement("img");
  reactionIcon.src = "/images/icon_crap.png";
  reactionIcon.classList.add("icon", "ms-2");
  reactionIcon.alt = "reaction icon";
  reactionDiv.appendChild(reactionIcon);

  const reactionCount = document.createElement("span");
  reactionCount.classList.add("fw-bold", "text-danger");
  reactionCount.textContent = postData._count.reactions;
  reactionDiv.appendChild(reactionCount);

  detailsDiv.appendChild(reactionDiv);

  const commentDiv = document.createElement("div");
  commentDiv.classList.add(
    "d-flex",
    "justify-content-end",
    "gap-4",
    "me-3",
    "align-items-center"
  );

  const commentIconContainer = document.createElement("div");
  commentDiv.appendChild(commentIconContainer);

  const commentIcon = document.createElement("img");
  commentIcon.src = "/images/icon_comment.png";
  commentIcon.classList.add("icon");
  commentIcon.alt = "comment icon";
  commentIconContainer.appendChild(commentIcon);

  detailsDiv.appendChild(commentDiv);

  bodyColumn.appendChild(detailsDiv);

  return post;
}
