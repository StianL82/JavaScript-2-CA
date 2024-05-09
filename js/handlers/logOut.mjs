export function setupLogoutButton() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); // Stopper lenken fra å navigere bort
      localStorage.clear(); // Renser all lokal lagring
      sessionStorage.clear(); // Du kan også ønske å rense sessionStorage hvis du bruker det
      window.location.href = "/"; // Omdirigerer til start- eller innloggingsside
    });
  }
}
