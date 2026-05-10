/* ============================================
   INTERACTIVE FEATURES & ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeChart();
    initializeScrollAnimations();
    initializeMobileMenu();
});

/* ============================================
   NAVIGATION FUNCTIONALITY
   ============================================ */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    document.querySelector('.nav-menu').classList.remove('active');
                }
            }
        });
    });
}

/* ============================================
   EXPERTISE CHART
   ============================================ */

function initializeChart() {
    const chartCanvas = document.getElementById('expertiseChart');
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    
    const data = {
        labels: [
            'SAP PP',
            'Production Planning',
            'Inventory Control',
            'Capacity Planning',
            'Excel/VBA',
            'AutoCAD'
        ],
        datasets: [{
            label: 'Expertise Level',
            data: [95, 92, 88, 90, 85, 75],
            borderColor: 'rgba(255, 255, 255, 1)',
            backgroundColor: 'rgba(0, 168, 232, 0.2)',
            borderWidth: 2,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(0, 168, 232, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            tension: 0.4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    font: {
                        size: 12
                    },
                    stepSize: 20
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: true,
                    drawOnChartArea: true
                },
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    };

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and elements
    const cards = document.querySelectorAll(
        '.expertise-card, .achievement-card, .timeline-card'
    );
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/* ============================================
   MOBILE MENU
   ============================================ */

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            hamburger.style.transition = 'all 0.3s ease';
            const spans = hamburger.querySelectorAll('span');
            
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(13px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-13px)';
            } else {
                spans[0].style.transform = 'rotate(0) translateY(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translateY(0)';
            }
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translateY(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translateY(0)';
        });
    });
}

/* ============================================
   COUNTER ANIMATION (Optional)
   ============================================ */

function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll events
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   LAZY LOADING IMAGES
   ============================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* ============================================
   FORM VALIDATION (If form is added)
   ============================================ */

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

/* ============================================
   KEYBOARD ACCESSIBILITY
   ============================================ */

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    // Tab navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-focused');
    }
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ============================================
   DARK MODE (Optional)
   ============================================ */

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

/* ============================================
   LOGGING & DEBUGGING
   ============================================ */

// Development helper
const portfolio = {
    version: '1.0.0',
    sections: document.querySelectorAll('section').length,
    cards: document.querySelectorAll('[class*="card"]').length,
    log: function() {
        console.log(`Portfolio v${this.version}`);
        console.log(`Sections: ${this.sections}`);
        console.log(`Cards: ${this.cards}`);
    }
};

// Uncomment to debug
// portfolio.log();
