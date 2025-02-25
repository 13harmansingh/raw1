
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

            // Close button logic (prevents multiple event listeners)
            const closeButton = modal.querySelector('.close-btn');
            closeButton.focus();
            
            closeButton.addEventListener("click", () => {
                modal.classList.remove("show");
            }, { once: true });  // Ensures only one event listener is added
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

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    if (darkModeToggle) {
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-mode");
        }

        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
            } else {
                localStorage.setItem("darkMode", "disabled");
            }
        });
    }

    // Scroll Animations (Only Using Intersection Observer)
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    elements.forEach(el => observer.observe(el));
});
