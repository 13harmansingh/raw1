document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const hero = document.querySelector('.hero');
  const cocktailItems = document.querySelectorAll(".cocktail-item");
  const modal = document.createElement("div");
  modal.classList.add("cocktail-modal");
  modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" aria-label="Close modal">&times;</button>
            <h3></h3>
            <img src="" alt="Cocktail Image">
            <p class="description"></p>
            <h4>Ingredients</h4>
            <ul class="ingredients"></ul>
            <h4>Preparation</h4>
            <p class="recipe"></p>
        </div>`;
  document.body.appendChild(modal);
  const menuIcon = document.querySelector(".menu-icon"); // Should be a <button>
  const navMenu = document.querySelector("header nav ul");


  // Smooth Scrolling (Improved)
  navLinks.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Set the background image of the hero section (if needed dynamically)
  // hero.style.backgroundImage = "url('images/img7.jpg')";  // Or set in CSS

  // Cocktail Modal (Improved)
  cocktailItems.forEach(item => {
    item.addEventListener("click", () => {
      const name = item.querySelector("h3").textContent;
      const description = item.querySelector("p").textContent;
      const image = item.querySelector("img").src;
      const ingredients = item.dataset.ingredients ? item.dataset.ingredients.split(",") : []; // Handle missing data
      const recipe = item.dataset.recipe || ""; // Handle missing data

      modal.querySelector("h3").textContent = name;
      modal.querySelector(".description").textContent = description;
      modal.querySelector("img").src = image;

      const ingredientsList = modal.querySelector(".ingredients");
      ingredientsList.innerHTML = "";
      ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient.trim(); // Trim whitespace
        ingredientsList.appendChild(li);
      });

      modal.querySelector(".recipe").textContent = recipe;
      modal.classList.add("show");

      // Focus on close button when modal opens
      const closeButton = modal.querySelector('.close-btn');
      if (closeButton) {
        closeButton.focus();
      }
    });
  });

  // Modal Close Functionality
    const closeButton = modal.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });


  // Mobile Navigation (Improved)
  if (menuIcon && navMenu) { // Check if elements exist
    menuIcon.addEventListener("click", () => {
        const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
        menuIcon.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle("active"); // Toggle the menu visibility
        menuIcon.classList.toggle("active"); // Toggle a class on the icon (e.g., for styling)

        if (!isExpanded) {
            // Focus the first link in the menu
            const firstLink = navMenu.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        } else {
            menuIcon.focus(); // Return focus to the menu icon
        }
    });

    navMenu.addEventListener("click", (e) => {
        if (window.innerWidth < 768 && e.target.tagName === 'A') { // Check if it's a link
            navMenu.classList.remove("active");
            menuIcon.classList.remove("active");
            menuIcon.setAttribute('aria-expanded', 'false'); // Update aria-expanded
        }
    });
}
});