/**
 * Al-Khayar Al-Saeb - Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const menuClose = document.querySelector('.mobile-nav-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (menuToggle && mobileNav) {
        const toggleMenu = () => {
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleMenu);
        if (menuClose) menuClose.addEventListener('click', toggleMenu);

        // Close menu when clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Dynamic Bubble Particles
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        const createBubble = () => {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const size = Math.random() * 40 + 10 + 'px';
            bubble.style.width = size;
            bubble.style.height = size;

            bubble.style.left = Math.random() * 100 + '%';

            const duration = Math.random() * 10 + 5 + 's';
            bubble.style.animationDuration = duration;

            const delay = Math.random() * 5 + 's';
            bubble.style.animationDelay = delay;

            particleContainer.appendChild(bubble);

            // Remove after animation
            setTimeout(() => {
                bubble.remove();
            }, (parseFloat(duration) + parseFloat(delay)) * 1000);
        };

        // Initial bubbles
        for (let i = 0; i < 15; i++) createBubble();
        // Constant generation
        setInterval(createBubble, 1500);
    }

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 95,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Staggered Scroll Reveal
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to elements
    const revealElements = document.querySelectorAll('.point-card, .jumbo-card, .product-item, .feature-box, .timeline-item, .trust-item');
    revealElements.forEach((el, index) => {
        el.style.transitionDelay = (index % 3) * 0.1 + 's';
        el.classList.add('reveal-prepare');
        revealObserver.observe(el);
    });

    // 4. Parallax Effect for Mesh BG
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const meshes = document.querySelectorAll('.mesh-circle');
        meshes.forEach((mesh, index) => {
            const speed = 0.05 * (index + 1);
            mesh.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 5. Sticky Header
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
});
