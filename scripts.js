document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const cocktailItems = document.querySelectorAll(".cocktail-item");
    const modal = document.createElement("div");
    modal.classList.add("cocktail-modal");

    document.body.appendChild(modal);
    
    // Mobile Navigation
    const menuIcon = document.querySelector(".menu-icon"); 
    const navMenu = document.querySelector("header nav ul");

    if (menuIcon && navMenu) {
        menuIcon.addEventListener("click", () => {
            const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
            menuIcon.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle("active");
            menuIcon.classList.toggle("active");
        });

        navMenu.addEventListener("click", (e) => {
            if (window.innerWidth < 768 && e.target.tagName === "A") {
                navMenu.classList.remove("active");
            }
        });
    }

    // Smooth Scrolling
    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Cocktail Modal
    cocktailItems.forEach(item => {
        item.addEventListener("click", () => {
            const name = item.querySelector("h3").textContent;
            const description = item.querySelector("p").textContent;
            const image = item.querySelector("img").src;
            const ingredients = item.dataset.ingredients ? item.dataset.ingredients.split(",") : [];
            const recipe = item.dataset.recipe || "";

            modal.innerHTML = `
                <div class="cocktail-modal-content">
                    <span class="close-btn">&times;</span>
                    <h3>${name}</h3>
                    <img src="${image}" alt="${name}">
                    <p class="description">${description}</p>
                    <h4>Ingredients</h4>
                    <ul class="ingredients">
                        ${ingredients.map(ing => `<li>${ing.trim()}</li>`).join('')}
                    </ul>
                    <h4>How it's Made</h4>
                    <p class="recipe">${recipe}</p>
                </div>
            `;

            modal.classList.add("show");

            const closeButton = modal.querySelector('.close-btn');
            closeButton.focus();

            closeButton.addEventListener("click", () => modal.classList.remove("show"));
        });
    });

    // Modal Close Event Listeners
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

    document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check localStorage to persist user preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", function () {
        if (this.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

    // Scroll Animations
    const elements = document.querySelectorAll('.fade-in');

    const fadeInOnScroll = () => {
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);
});