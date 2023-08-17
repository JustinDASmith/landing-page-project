// Define global variables
const sections = document.querySelectorAll("section");
const navbarList = document.getElementById("navbar__list");
const scrollTopButton = document.getElementById("scroll-top");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Helper function to remove active class from all sections
function removeActiveClass() {
    sections.forEach((section) => {
        section.classList.remove("your-active-class");
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    sections.forEach((section) => {
        const listItem = document.createElement("li");
        const sectionName = section.getAttribute("data-nav");
        const link = document.createElement("a");
        
        link.textContent = sectionName;
        link.classList.add("menu__link");
        link.href = "#" + section.id;
        
        listItem.appendChild(link);
        navbarList.appendChild(listItem);
    });
}

// Add class 'active' to section when near top of viewport
function setActiveClass() {
    sections.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top >= 0 && bounding.top <= window.innerHeight / 2) {
            removeActiveClass();
            section.classList.add("your-active-class");

            // Highlight active section in navigation
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) {
                const menuLinks = document.querySelectorAll(".menu__link");
                menuLinks.forEach((link) => link.classList.remove("active"));
                activeLink.classList.add("active");
            }
        } else {
            section.classList.remove("your-active-class");
        }
    });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
buildNav();

// Scroll to section on link click
navbarList.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.tagName === "A") {
        const targetId = event.target.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    }
});

// Set sections as active
document.addEventListener("scroll", setActiveClass);

// Show "Back to Top" button when user scrolls below the fold
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});

// Scroll to top when "Back to Top" button is clicked
scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
