export function addEditButtonListener(editButton, postData) {
  editButton.addEventListener("click", () => {
    sessionStorage.setItem("returnUrl", window.location.href);
    window.location.href = `/feed/edit/?id=${postData.id}`;
  });
}
