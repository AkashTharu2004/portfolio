document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav ul');

    // Toggle mobile menu visibility
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    nav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = '#' + section.id;
            }
        });

        // Highlight active menu item
        const activeLink = document.querySelector('nav ul li.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        const newActiveLink = document.querySelector(`nav ul li a[href="${current}"]`);
        if (newActiveLink) {
            newActiveLink.parentElement.classList.add('active');
        }

        // Toggle sticky header
        if (window.scrollY > headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - headerHeight + 1,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission simulation
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission (replace with actual submission code)
        const formData = new FormData(contactForm);
        console.log('Form submitted with data:', formData);
        alert('Message sent successfully!');
        contactForm.reset();
    });
});
