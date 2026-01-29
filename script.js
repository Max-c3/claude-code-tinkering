/**
 * Personal Webpage Scripts
 * - Theme toggle with persistence
 * - Scroll animations
 * - Navigation interactions
 */

(function() {
    'use strict';

    // ============================================
    // Theme Toggle
    // ============================================

    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or system preference
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    // Apply theme
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Initialize theme
    setTheme(getPreferredTheme());

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optionally stop observing after animation
                // animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .glass-card').forEach(el => {
        el.classList.add('animate-ready');
        animateOnScroll.observe(el);
    });

    // Add CSS for scroll animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-ready.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .glass-card.animate-ready {
            transition-delay: 0.1s;
        }
        .beliefs-grid .glass-card:nth-child(1) { transition-delay: 0.1s; }
        .beliefs-grid .glass-card:nth-child(2) { transition-delay: 0.2s; }
        .beliefs-grid .glass-card:nth-child(3) { transition-delay: 0.3s; }
        .beliefs-grid .glass-card:nth-child(4) { transition-delay: 0.4s; }
        .projects-grid .glass-card:nth-child(1) { transition-delay: 0.1s; }
        .projects-grid .glass-card:nth-child(2) { transition-delay: 0.2s; }
        .projects-grid .glass-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);

    // ============================================
    // Smooth Scroll for Navigation
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Active Navigation Link
    // ============================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Add active link styles
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: var(--text-primary);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);

    // ============================================
    // Footer Year
    // ============================================

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ============================================
    // Navigation Background on Scroll
    // ============================================

    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.background = 'var(--glass-bg)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Parallax Effect for Orbs (subtle)
    // ============================================

    const orbs = document.querySelectorAll('.orb');

    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            orbs.forEach((orb, index) => {
                const speed = 0.05 * (index + 1);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

})();
