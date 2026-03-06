document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const modeToggle = document.getElementById("mode-toggle");

  if (modeToggle) {
    const icon = modeToggle.querySelector("i");

    if (localStorage.getItem("colorMode") === "dark") {
      body.classList.add("dark-mode");
    } else if (localStorage.getItem("colorMode") === "bright") {
      body.classList.add("bright-mode");
    }

    modeToggle.addEventListener("click", function () {
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("bright-mode");
        if (icon) {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        }
        localStorage.setItem("colorMode", "bright");
      } else {
        body.classList.remove("bright-mode");
        body.classList.add("dark-mode");
        if (icon) {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
        localStorage.setItem("colorMode", "dark");
      }
    });
  }

  const revealNodes = document.querySelectorAll(".reveal");
  if (!revealNodes.length) return;

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach(function (el) {
    observer.observe(el);
  });
});
