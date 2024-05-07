import { defaultAvatar, isValidURL } from "./updateUserData.mjs";
import { removePost } from "../api/posts/delete.mjs";
import { getLoggedInUser } from "../api/auth/login.mjs"; // Anta at du har en modul for å hente innlogget bruker

export function postTemplate(postData) {
  const { id, author } = postData;
  const loggedInUser = getLoggedInUser(); // Hent innlogget bruker
  const isAuthorLoggedIn = loggedInUser && loggedInUser.name === author.name; // Sjekk om innlogget bruker er forfatteren av posten basert på navn

  const post = document.createElement("div");
  post.classList.add("card", "mb-4", "bg-info", "text-black");

  // Opprett dropdown-container og dropdown-knapp bare hvis innlogget bruker er forfatteren
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

    // Opprett edit-knappen
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("btn", "btn-warning", "edit-post-button"); // Bruker "btn-warning" klassen for styling
    editButton.textContent = "Edit Post";
    editContainer.appendChild(editButton);

    // Legg til en klikk-event handler for å omdirigere til redigeringssiden med postens ID
    editButton.addEventListener("click", () => {
      sessionStorage.setItem("returnUrl", window.location.href);
      window.location.href = `/feed/edit/?id=${postData.id}`; // Bruker "id" som URL-parameter for konsistens med form listener
    });

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

    // Opprett bekreftelsesmodalen
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

    // Innholdet i modalen
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
    post.appendChild(modal); // Legg til modalen i posten

    // Legg til en hendelseslytter på slettingsknappen
    deleteButton.addEventListener("click", function () {
      const postId = id; // Dette skal være ID-en fra postdata
      const confirmDeleteButton = modal.querySelector(".confirm-delete-button");
      confirmDeleteButton.dataset.postId = postId; // Sett post-ID som en attributt på bekreftelsesknappen

      // Vis modalen
      var myModal = new bootstrap.Modal(modal);
      myModal.show();
    });

    // Det er viktig at denne koden ligger utenfor "click" event for deleteButton, slik at den ikke legger til flere lyttere
    modal.querySelector(".confirm-delete-button").addEventListener(
      "click",
      async function () {
        const postId = this.dataset.postId; // Hent post-ID fra data-attributt
        try {
          const status = await removePost(postId);
          if (status === 200) {
            // Endre fra 204 til 200 siden dette er statuskoden du får
            let myModal = bootstrap.Modal.getInstance(modal);
            myModal.hide(); // Lukker modalen
            post.remove(); // Fjerner postelementet fra UI
            alert("Post deleted successfully!");
          } else {
            alert("Failed to delete post");
          }
        } catch (error) {
          console.error("Deletion error:", error);
          alert("Error: " + (error.message || "Unknown error"));
        }
      },
      { once: true } // Sørger for at hendelsen kun håndteres én gang
    );
  }

  //////////////////////////////////////////////

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

  /////////////////////// her må jeg få lagt inn korrekt avatar og name

  const authorAvatar = author.avatar;
  const thumbnailImage = document.createElement("img");

  // Sjekk om forfatterens avatar er tomt, hvis det er tilfelle, bruk defaultAvatar
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
  authorNameContainer.classList.add("text-center", "text-danger", "mt-0");
  authorNameContainer.textContent = authorName; // Bruk forfatterens navn
  thumbnailColumn.appendChild(authorNameContainer);

  // Oppretter bodyColumn som vil inneholde innholdet for posten
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

  ////DATO/////

  // Oppretter en ny div for å vise datoen
  const dateDiv = document.createElement("div");
  dateDiv.classList.add("date-info", "mb-2", "ms-2");

  // Formatterer datoene fra APIen
  const createdDate = new Date(postData.created);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  });
  dateDiv.textContent = `${dateFormatter.format(createdDate)}`;

  if (postData.updated && postData.updated !== postData.created) {
    const updatedDate = new Date(postData.updated);
    dateDiv.textContent += ` | Updated: ${dateFormatter.format(updatedDate)}`;
  }

  // Legger datoen til i bodyColumn før contentDiv
  bodyColumn.appendChild(dateDiv);

  // Oppretter contentDiv som vil holde på selve innholdet og datoen
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

  // Sjekk om det finnes tags og opprett en container for dem
  if (postData.tags && postData.tags.length > 0) {
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add(
      "d-flex",
      "flex-wrap", // Legger til wrapping
      "justify-content-start",
      "gap-2",
      "ms-2"
    );
    contentDiv.appendChild(tagsContainer);

    // Iterer gjennom hver tag og opprett et span-element for hver
    postData.tags.forEach((tag) => {
      if (tag) {
        // Sørg for at taggen ikke er en tom streng
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag"); // Oppdater klassenavnet til "tag"
        tagElement.textContent = `#${tag}`; // Legger til # foran taggen
        tagsContainer.appendChild(tagElement);
      }
    });
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

  return post;
}

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}
