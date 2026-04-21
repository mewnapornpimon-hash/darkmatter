const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");
const menuRight = document.getElementById("menuRight");
const accountHeader = document.querySelector(".account-header");

function openMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.add("active");
  if (accountHeader) accountHeader.classList.add("menu-open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.remove("active");
  if (accountHeader) accountHeader.classList.remove("menu-open");
  document.body.style.overflow = "";
}

if (menuOpen) {
  menuOpen.addEventListener("click", openMenu);
}

if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay || e.target === menuRight) {
      closeMenu();
    }
  });
}