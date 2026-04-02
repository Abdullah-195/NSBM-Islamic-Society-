document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle interaction
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    menuToggle.addEventListener('click', () => {
        // Expand menu on mobile
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            if (navCta) navCta.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';

            if (navCta) {
                navCta.style.display = 'inline-flex';
                navCta.style.marginTop = '1rem';
            }
        }
    });
    // Dynamic Notices Rendering
    function renderNotices() {
        if (typeof noticesData === 'undefined') return;

        const homeContainer = document.getElementById('home-notices-container');
        const pageContainer = document.getElementById('page-notices-container');
        
        if (!homeContainer && !pageContainer) return;

        const generateNoticeHTML = (notice, delayIndex) => {
            let detailsHTML = notice.details.map(d => `<p><i class="${d.icon}"></i> ${d.text}</p>`).join('');
            
            let descHTML = notice.description ? `<p class="event-desc">${notice.description}</p>` : '';
            
            let quoteHTML = notice.quote ? `
                <div class="event-desc" style="margin-top: 1rem; padding: 1rem; border-left: 3px solid var(--brand-green); background: var(--bg-alt); border-radius: 0 8px 8px 0;">
                    <p style="font-style: italic; color: var(--text-muted); font-size: 0.9rem; margin: 0; line-height: 1.4;">${notice.quote.text}</p>
                    <p style="font-size: 0.8rem; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0; color: var(--brand-blue-dark);">${notice.quote.reference}</p>
                </div>
            ` : '';

            // Using delayIndex modulo to prevent huge delays if many elements exist
            let delay = (delayIndex % 10) || 1; 

            return `
                <div class="event-card reveal fade-up" style="transition-delay: 0.${delay}s;">
                    <div class="event-date" style="background: ${notice.date.bgColor}; color: ${notice.date.textColor};">
                        <span class="day">${notice.date.day}</span>
                        <span class="month">${notice.date.month}</span>
                    </div>
                    <div class="event-details">
                        <div class="event-category" style="background:${notice.category.bgColor}; color:${notice.category.textColor}">${notice.category.label}</div>
                        <h3>${notice.title}</h3>
                        ${detailsHTML}
                        ${descHTML}
                        ${quoteHTML}
                    </div>
                </div>
            `;
        };

        if (homeContainer) {
            homeContainer.innerHTML = noticesData.slice(0, 3).map((notice, index) => generateNoticeHTML(notice, index + 1)).join('');
        }
        
        if (pageContainer) {
            pageContainer.innerHTML = noticesData.map((notice, index) => generateNoticeHTML(notice, index + 1)).join('');
        }
    }

    renderNotices();

    // Scroll Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for navbar height
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    if (navCta) navCta.style.display = 'none';
                }
            }
        });
    });

    // Active Members Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Counter speed (lower is faster)

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


});
