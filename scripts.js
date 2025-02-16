document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute("href")).scrollIntoView({
              behavior: "smooth",
              block: "start"
          });
      });
  });

  // Cocktail Modal
  const cocktailItems = document.querySelectorAll(".cocktail-item");
  const modal = document.createElement("div");
  modal.classList.add("cocktail-modal");
  modal.innerHTML = `
      <div class="modal-content">
          <span class="close-btn">&times;</span>
          <h3></h3>
          <img src="" alt="Cocktail Image">
          <p class="description"></p>
          <h4>Ingredients</h4>
          <ul class="ingredients"></ul>
          <h4>Preparation</h4>
          <p class="recipe"></p>
      </div>`;
  document.body.appendChild(modal);

  cocktailItems.forEach(item => {
      item.addEventListener("click", () => {
          const name = item.querySelector("h3").textContent;
          const description = item.querySelector("p").textContent;
          const image = item.querySelector("img").src;

          modal.querySelector("h3").textContent = name;
          modal.querySelector(".description").textContent = description;
          modal.querySelector("img").src = image;

          const ingredients = ["Premium Spirits", "Fresh Ingredients", "Secret Touch"];
          const recipe = "Expertly crafted with precision and passion to enhance your experience.";

          const ingredientsList = modal.querySelector(".ingredients");
          ingredientsList.innerHTML = "";
          ingredients.forEach(ingredient => {
              const li = document.createElement("li");
              li.textContent = ingredient;
              ingredientsList.appendChild(li);
          });

          modal.querySelector(".recipe").textContent = recipe;
          modal.classList.add("show");
      });
  });

  modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("close-btn")) {
          modal.classList.remove("show");
      }
  });

  // Mobile Navigation Toggle
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector("header nav ul");

  menuIcon.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuIcon.classList.toggle("open");
  });

  navMenu.addEventListener("click", () => {
      if (window.innerWidth < 768) {
          navMenu.classList.remove("active");
          menuIcon.classList.remove("open");
      }
  });
});
