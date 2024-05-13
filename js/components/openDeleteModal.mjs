document.addEventListener("DOMContentLoaded", () => {
  const openModalButtons = document.querySelectorAll(".open-modal-button");
  openModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".card").querySelector(".staticBackdrop");
      const myModal = new bootstrap.Modal(modal);
      myModal.show();
    });
  });
});
