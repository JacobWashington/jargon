/*===== MENU SHOW =====*/

const toggle = document.getElementById("nav-toggle");
const signIn = document.getElementById("signinBtn");
const signInForm = document.getElementById("signin");
const logout = document.getElementById('logoutBtn');
const nav = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

signIn.addEventListener("click", () => {
  signInForm.classList.toggle("hide");
  nav.classList.toggle("hide");
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

/*SCROLL HOME*/
sr.reveal(".home__title", {});
sr.reveal(".button", { delay: 200 });
sr.reveal(".home__img", { delay: 400 });

/*SCROLL REGISTER*/
sr.reveal(".signup__input", { interval: 200 });