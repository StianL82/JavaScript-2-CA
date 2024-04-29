/* export function createPostCard(postData) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-4", "bg-info", "text-black");

  const row = document.createElement("div");
  row.classList.add("row");
  card.appendChild(row);

  const imageColumn = document.createElement("div");
  imageColumn.classList.add(
    "col-sm-4",
    "col-md-3",
    "col-lg-2",
    "d-flex",
    "flex-column",
    "align-items-center",
    "justify-content-center"
  );
  row.appendChild(imageColumn);

  const imageWrapper = document.createElement("div");
  imageColumn.appendChild(imageWrapper);

  const image = document.createElement("img");
  image.src = "../images/profile_me_small.png"; // Bruk standardprofilbilde for øyeblikket
  image.classList.add("card-img-top", "img-fluid", "p-3", "pb-0");
  image.alt = "Thumbnail"; // Bruk standard alternativ for øyeblikket
  imageWrapper.appendChild(image);

  const username = document.createElement("p");
  username.textContent = getLoggedInUsername(); // Henter innlogget brukernavn
  username.classList.add("text-center", "text-danger", "fs-5", "ms-3", "mt-4");
  imageColumn.appendChild(username);

  const bodyColumn = document.createElement("div");
  bodyColumn.classList.add(
    "card-body",
    "col-sm-8",
    "col-md-9",
    "d-flex",
    "flex-column",
    "align-items-stretch"
  );
  row.appendChild(bodyColumn);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add(
    "d-flex-column",
    "border",
    "border-dark",
    "rounded-2",
    "m-2",
    "bg-custom-light-grey"
  );
  bodyColumn.appendChild(contentWrapper);

  const title = document.createElement("h4");
  title.textContent = postData.title; // Bruk tittel fra postData
  title.classList.add("card-title", "mb-3", "p-2");
  contentWrapper.appendChild(title);

  const content = document.createElement("p");
  content.textContent = postData.content; // Bruk innhold fra postData
  content.classList.add("card-text", "p-2");
  contentWrapper.appendChild(content);

  const likesWrapper = document.createElement("div");
  likesWrapper.classList.add(
    "d-flex",
    "justify-content-start",
    "me-3",
    "mt-2",
    "align-items-center"
  );
  bodyColumn.appendChild(likesWrapper);

  postData.icons.forEach((iconSrc) => {
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.classList.add("icon-xs");
    likesWrapper.appendChild(icon);
  });

  const likesCount = document.createElement("h4");
  likesCount.textContent = postData.likes; // Bruk likes fra postData
  likesCount.classList.add("likes", "ms-2");
  likesWrapper.appendChild(likesCount);

  const actionsWrapper = document.createElement("div");
  actionsWrapper.classList.add(
    "d-flex",
    "justify-content-end",
    "gap-4",
    "me-3",
    "mt-2",
    "align-items-center"
  );
  bodyColumn.appendChild(actionsWrapper);

  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  actionsWrapper.appendChild(dropdown);

  const dropdownButton = document.createElement("button");
  dropdownButton.classList.add("btn", "btn-secondary", "dropdown-toggle");
  dropdownButton.type = "button";
  dropdownButton.dataset.bsToggle = "dropdown";
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdown.appendChild(dropdownButton);

  const dropdownIcon = document.createElement("img");
  dropdownIcon.src = postData.dropdownIconSrc;
  dropdownIcon.classList.add("icon-small");
  dropdownButton.appendChild(dropdownIcon);

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu");
  dropdown.appendChild(dropdownMenu);

  postData.dropdownItems.forEach((item) => {
    const listItem = document.createElement("li");
    dropdownMenu.appendChild(listItem);

    const itemIcon = document.createElement("img");
    itemIcon.src = item.iconSrc;
    itemIcon.classList.add("icon-small");
    listItem.appendChild(itemIcon);

    const itemText = document.createTextNode(item.text);
    listItem.appendChild(itemText);
  });

  const commentIconWrapper = document.createElement("div");
  actionsWrapper.appendChild(commentIconWrapper);

  const commentIcon = document.createElement("img");
  commentIcon.src = postData.commentIconSrc;
  commentIcon.classList.add("icon-small");
  commentIcon.alt = "comment icon";
  commentIconWrapper.appendChild(commentIcon);

  return card;
}

// Funksjon for å hente innlogget brukernavn fra skjemaet
function getLoggedInUsername() {
  const loggedInUsernameElement = document.querySelector(".loggedInUsername");
  return loggedInUsernameElement.textContent.trim();
}

// Lytter etter innsending av skjema
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Forhindrer standard form handling

  // Henter data fra skjemaet
  const postTitle = document.getElementById("postTitle").value;
  const postContent = document.getElementById("postContent").value;

  // Oppretter postData-objekt med innsendte data og andre nødvendige verdier
  const postData = {
    title: postTitle,
    content: postContent,
    icons: [
      "../images/icon_thumbsdown.png",
      "../images/icon_crap.png",
      "../images/icon_middle_finger.png",
      "../images/icon_worst_ever.png",
    ],
    likes: 0, // Setter antall likerklikk til 0 som standard
    dropdownIconSrc: "../images/icon_thumbsdown.png", // Setter standardikon for dropdown-knappen
    dropdownItems: [
      { iconSrc: "../images/icon_thumbsdown.png", text: "Dislike" },
      { iconSrc: "../images/icon_crap.png", text: "Total Crap" },
      { iconSrc: "../images/icon_middle_finger.png", text: "Hate This" },
      { iconSrc: "../images/icon_worst_ever.png", text: "Worst EVER" },
    ],
    commentIconSrc: "../images/icon_comment.png", // Setter standardikon for kommentarknappen
  };

  // Opprett ny post og legg den til på siden
  const postCard = createPostCard(postData);
  document.body.appendChild(postCard);

  // Tilbakestill skjemaet
  form.reset();
}); */
