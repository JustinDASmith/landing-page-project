// Define global variables
const sections = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');
const scrollTopButton = document.querySelector('#scroll-top');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Helper function to remove active class from all sections
function removeActiveClass() {
    sections.forEach(section => {
        section.classList.remove('active');
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the navigation menu
function buildNav() {
    sections.forEach(section => {
        const navListItem = document.createElement('li');
        navListItem.innerHTML = `<a class="menu__link" href="#${section.id}">${section.dataset.nav}</a>`;
        navbarList.appendChild(navListItem);
    });
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect();
        if (sectionPosition.top <= 150 && sectionPosition.bottom >= 150) {
            removeActiveClass();
            section.classList.add('active');
        }
    });
}

// Scroll to anchor ID using scrollTO event
document.querySelectorAll('.section-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build the navigation menu
buildNav();

// Set sections as active
window.addEventListener('scroll', setActiveSection);

// Show or hide the scroll-to-top button based on scroll position
window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

// Scroll to top when the button is clicked
scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
