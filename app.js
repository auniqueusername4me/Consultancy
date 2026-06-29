document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Navigation UI visibility initialization
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('ui-visible');
    }

    // 2. Fallback / Lazy loading for pages with background loop videos
    const lazyVideos = document.querySelectorAll('video.hero-video-bg');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.paused) {
                    video.play().catch(err => console.log("Video auto-play deferred:", err));
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.1 });

    lazyVideos.forEach(video => {
        video.autoplay = false;
        videoObserver.observe(video);
    });

    // 3. Header Scroll Transitions & Subtitle Scroll Fade-Out
    const subtitle = document.querySelector('.hero-subtitle');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Toggle header scrolled styling
        if (scrollPos > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Fade out hero subtitle on scroll down
        if (subtitle) {
            const fadeLimit = 220; // Fully transparent by 220px scroll
            let opacity = 1 - (scrollPos / fadeLimit);
            opacity = Math.max(0, Math.min(1, opacity));
            subtitle.style.opacity = opacity;
        }
    }, { passive: true });

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // 5. Scroll Reveal Animations (Intersection Observer supporting standard & scale models)
    const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 6. Counter Up Animation for Stats
    const statsSection = document.querySelector('.metrics-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statsSection && statNumbers.length > 0) {
        let animated = false;
        
        const countUp = (element) => {
            const target = parseInt(element.getAttribute('data-target'), 10);
            const duration = 1800; // Animation duration in ms
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;
            
            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = current;
                }
            }, stepTime);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    statNumbers.forEach(stat => countUp(stat));
                    animated = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        statsObserver.observe(statsSection);
    }

    // 7. Dynamic Footer Year Update
    const copyrightYear = document.querySelector('#copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});
