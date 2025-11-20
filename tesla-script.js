// Mobile Menu Functionality
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Open mobile menu
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

// Close mobile menu
closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for hero sections animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all hero sections
const heroSections = document.querySelectorAll('.hero');
heroSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    heroObserver.observe(section);
});

// Button hover effects with ripple
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        const rippleContainer = document.createElement('span');
        rippleContainer.style.position = 'absolute';
        rippleContainer.style.top = '0';
        rippleContainer.style.left = '0';
        rippleContainer.style.width = '100%';
        rippleContainer.style.height = '100%';
        rippleContainer.style.overflow = 'hidden';
        rippleContainer.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';

        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';

        rippleContainer.appendChild(ripple);
        this.appendChild(rippleContainer);

        setTimeout(() => {
            rippleContainer.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero backgrounds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Dynamic text color based on section
const updateNavColor = () => {
    const scrollPosition = window.pageYOffset + 100;
    const darkSections = document.querySelectorAll('.hero-dark, .hero-solar');
    const logo = document.querySelector('.tesla-logo');
    const navLinks = document.querySelectorAll('.nav-menu a, .nav-actions a, .menu-btn');

    let isDarkSection = false;

    darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            isDarkSection = true;
        }
    });

    if (isDarkSection && window.pageYOffset > 50) {
        logo.style.color = 'white';
        navLinks.forEach(link => {
            link.style.color = 'white';
        });
    } else {
        logo.style.color = '#181b21';
        navLinks.forEach(link => {
            link.style.color = '#181b21';
        });
    }
};

window.addEventListener('scroll', updateNavColor);
updateNavColor();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');

    parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
    });
}, 10);

window.addEventListener('scroll', debouncedParallax);

console.log('Tesla Landing Page Loaded Successfully!');
