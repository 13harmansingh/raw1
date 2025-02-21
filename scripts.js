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

    // Dark Mode Toggle (Fixed for Button)
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    if (darkModeToggle) {
        // Check localStorage to persist user preference
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-mode");
        }

        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            // Save user preference
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
            } else {
                localStorage.setItem("darkMode", "disabled");
            }
        });
    }

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
// scripts.js
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target); // Optional: Stop observing once animated
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

animateOnScroll(); // Initialize the animation

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// Menu Toggle
const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
        nav.classList.remove('show');
    }
});


// Modal Functionality (Improved with Event Delegation)
const cocktailList = document.querySelector('.cocktail-list'); // Get the parent container

cocktailList.addEventListener('click', (event) => {
    const cocktailItem = event.target.closest('.cocktail-item'); // Find the clicked cocktail item

    if (cocktailItem) { // Check if a cocktail item was clicked
        const ingredients = cocktailItem.dataset.ingredients;
        const recipe = cocktailItem.dataset.recipe;
        const cocktailName = cocktailItem.querySelector('h3').textContent;

        // Create the modal (or select an existing one if you prefer)
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${cocktailName}</h2>
                <p><strong>Ingredients:</strong> ${ingredients}</p>
                <p><strong>Recipe:</strong> ${recipe}</p>
                <button class="close-btn" aria-label="Close modal">×</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Close Modal Functionality (using event delegation on the body)
        document.body.addEventListener('click', closeModal); // Add listener

        function closeModal(event) {
            if (event.target.classList.contains('close-btn') || // Clicked close button
                !modal.contains(event.target)) { // Clicked outside modal
                modal.remove();
                document.body.removeEventListener('click', closeModal); // Remove listener
            }
        }
    }
});

