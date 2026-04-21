const cards = document.querySelectorAll(".hover-video-card");

cards.forEach((card) => {
  const video = card.querySelector(".hover-video");
  if (!video) return;

  function playVideo() {
    card.classList.add("active");
    video.currentTime = 0;

    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {});
    }
  }

  function stopVideo() {
    video.pause();
    video.currentTime = 0;
    card.classList.remove("active");
  }

  card.addEventListener("mouseenter", playVideo);
  card.addEventListener("mouseleave", stopVideo);

  card.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();

      const isActive = card.classList.contains("active");

      document.querySelectorAll(".hover-video-card").forEach((item) => {
        const itemVideo = item.querySelector(".hover-video");
        if (itemVideo) {
          itemVideo.pause();
          itemVideo.currentTime = 0;
        }
        item.classList.remove("active");
      });

      if (!isActive) {
        playVideo();
      }
    }
  });
});

const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");

if (menuOpen && menuClose && menuOverlay) {
  menuOpen.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

const topbar = document.querySelector(".topbar");

if (menuOpen && menuClose && menuOverlay) {
  menuOpen.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    if (topbar) topbar.classList.add("hide-topbar");
    document.body.style.overflow = "hidden";
  });

  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    if (topbar) topbar.classList.remove("hide-topbar");
    document.body.style.overflow = "";
  });
}