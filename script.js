const menuToggle = document.querySelector(".menu-toggle");
const navBar = document.querySelector(".nav-bar");

if (menuToggle && navBar) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navBar.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
        const clickedInside = navBar.contains(event.target) || menuToggle.contains(event.target);
        if (!clickedInside && navBar.classList.contains("open")) {
            navBar.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
const navLinks = document.querySelectorAll("[data-nav]");

navLinks.forEach((link) => {
    if (link.dataset.nav === currentPage) {
        link.classList.add("active");
    }
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const darkModeToggle = document.querySelector(".dark-mode-toggle");
const body = document.body;

const isDarkMode = localStorage.getItem("darkMode") === "enabled";

if (isDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("darkMode", null);
        darkModeToggle.textContent = "🌙";
    }
});
