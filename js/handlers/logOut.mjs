export function setupLogoutButton() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    });
  }
}
