export function openModal() {
  // Fjern koden som åpner modalen her
}

// Legg til event listener på knapper med klassen "open-modal-button"
document.addEventListener("DOMContentLoaded", () => {
  const openModalButtons = document.querySelectorAll(".open-modal-button");
  openModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".card").querySelector(".staticBackdrop"); // Finn den nærmeste forelderen med class="card" og deretter modalen med class="staticBackdrop"
      const myModal = new bootstrap.Modal(modal); // Opprett en ny modal
      myModal.show(); // Vis modalen
    });
  });
});
