import { getProfile, updateProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";

export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email } = load("profile");
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile(name);

    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      profile.email = email;

      try {
        const updatedProfile = await updateProfile(profile);

        const storedProfile = JSON.parse(localStorage.getItem("profile"));
        storedProfile.banner = updatedProfile.banner;
        storedProfile.avatar = updatedProfile.avatar;
        localStorage.setItem("profile", JSON.stringify(storedProfile));

        window.location.reload();
      } catch (error) {
        console.error("Feil ved oppdatering av profil:", error);
      }
    });
  }
}
