export function addDeleteButtonListener(deleteButton, modal, id) {
  deleteButton.addEventListener("click", function () {
    const postId = id;
    const confirmDeleteButton = modal.querySelector(".confirm-delete-button");
    confirmDeleteButton.dataset.postId = postId;

    var myModal = new bootstrap.Modal(modal);
    myModal.show();
  });
}
