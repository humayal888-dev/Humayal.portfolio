document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const accentSelect = document.getElementById('accent-select');
    const navLinks = document.querySelectorAll('.nav-links a, .logo');
    const pageSections = document.querySelectorAll('.page-section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const contactForm = document.getElementById('contact-form');

    /* ----------------------------------
       1. Dark Mode & Theme System
    ---------------------------------- */
    
    // Check saved theme or fallback to system settings
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Set initial light/dark state
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Toggle Dark Mode
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // Handle Accent Colors separately
    const savedAccent = localStorage.getItem('portfolio-accent') || 'midnight';
    document.documentElement.setAttribute('data-accent', savedAccent);
    accentSelect.value = savedAccent;

    accentSelect.addEventListener('change', (e) => {
        const newAccent = e.target.value;
        document.documentElement.setAttribute('data-accent', newAccent);
        localStorage.setItem('portfolio-accent', newAccent);
    });

    /* ----------------------------------
       2. Single Page Navigation
    ---------------------------------- */
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');

            // Hide all pages
            pageSections.forEach(section => section.classList.remove('active'));
            
            // Remove active states from nav links
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

            // Show selected page & set active link
            const selectedSection = document.getElementById(targetPage);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }

            const activeNavLink = document.querySelector(`.nav-links a[data-page="${targetPage}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
        });
    });

    /* ----------------------------------
       3. Skills Filtering System
    ---------------------------------- */
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update button UI
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-filter');

            // Filter elements
            skillCards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------
       4. Form Handler
    ---------------------------------- */
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent.');
            contactForm.reset();
        });
    }
});