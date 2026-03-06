document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var navList = document.getElementById("primary-nav");
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-list a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setMenuState(isOpen) {
    if (!navToggle || !siteNav || !navList) return;
    navToggle.classList.toggle("is-open", isOpen);
    siteNav.classList.toggle("is-open", isOpen);
    navList.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (navToggle && siteNav && navList) {
    navToggle.addEventListener("click", function () {
      setMenuState(!siteNav.classList.contains("is-open"));
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target === siteNav) {
        setMenuState(false);
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) {
        setMenuState(false);
      }
    });
  }

  function setActiveLink(activeId) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  var revealNodes = document.querySelectorAll(".reveal");
  if (revealNodes.length) {
    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach(function (el) {
        el.classList.add("visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealNodes.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  var dateNode = document.getElementById("date");
  if (dateNode) {
    var year = new Date().getFullYear();
    dateNode.textContent = "© " + year + " Thomas Tourlidas. All rights reserved.";
  }
});
