export function hydrateEmailField() {
  document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const storedEmail = sessionStorage.getItem("userEmail");

    if (emailInput && storedEmail) {
      emailInput.value = storedEmail;
      sessionStorage.removeItem("userEmail");
    }
  });
}
