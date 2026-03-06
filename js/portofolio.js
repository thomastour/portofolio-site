document.addEventListener("DOMContentLoaded", function() {
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  // Check if the user's preference is already set
  if (localStorage.getItem("colorMode") === "dark") {
      body.classList.add("dark-mode");
  } else if (localStorage.getItem("colorMode") === "bright") {
      body.classList.add("bright-mode");
      
     
      
  }

  modeToggle.addEventListener("click", () => {
      if (body.classList.contains("dark-mode")) {
          body.classList.remove("dark-mode");
          modeToggle.querySelector("i").classList.toggle("fa-moon");
          body.classList.add("bright-mode");
          modeToggle.querySelector("i").classList.toggle("fa-sun");
          localStorage.setItem("colorMode", "bright");
      } else {
        modeToggle.querySelector("i").classList.toggle("fa-sun");
          body.classList.remove("bright-mode");
          modeToggle.querySelector("i").classList.toggle("fa-moon");
          body.classList.add("dark-mode");
          localStorage.setItem("colorMode", "dark");
      }
  });

});


