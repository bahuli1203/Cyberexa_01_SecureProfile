document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       STICKY NAVBAR & ACTIVE NAV LINKS (MULTI-PAGE COMPATIBLE)
       ========================================== */
    const header = document.querySelector('.navbar-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    const highlightActiveNav = () => {
        // Only run scroll-spying active highlights if we are on the index home page
        const path = window.location.pathname;
        const isSubPage = path.endsWith('about.html') || path.endsWith('skills.html') || path.endsWith('contact.html');
        if (isSubPage) return;

        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset for accuracy

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Only update links targeting local page sections
            if (href.startsWith('#')) {
                link.classList.remove('active');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        highlightActiveNav();
    });

    handleNavbarScroll();
    highlightActiveNav();


    /* ==========================================
       MOBILE NAV DRAWER OPEN/CLOSE
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('open');
        mobileDrawer.classList.toggle('open');
        document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });


    /* ==========================================
       CUSTOM CURSOR GLOW EFFECT
       ========================================== */
    const cursorGlow = document.getElementById('cursor-glow');

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });


    /* ==========================================
       SCROLL PROGRESS INDICATOR
       ========================================== */
    const scrollIndicator = document.getElementById('scroll-indicator');

    const updateScrollProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        scrollIndicator.style.width = `${scrolledPercentage}%`;
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();


    /* ==========================================
       BACK TO TOP BUTTON SCROLLING
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    const handleBackToTopVisibility = () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleBackToTopVisibility);
    handleBackToTopVisibility();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==========================================
       3D PERSPECTIVE MOUSE TILT ON GLASS CARDS
       ========================================== */
    const glassCards = document.querySelectorAll('.glass-card');
    
    const isTouchDevice = () => {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    };

    if (!isTouchDevice()) {
        glassCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = -(y - centerY) / (centerY / 10);
                const rotateY = (x - centerX) / (centerX / 10);
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }


    /* ==========================================
       FADE-UP INTERSECTION OBSERVER ANIMATION
       ========================================== */
    const fadeUpElements = document.querySelectorAll('.fade-up');

    const fadeObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeUpElements.forEach(el => {
        fadeObserver.observe(el);
    });

    const skillCards = document.querySelectorAll('.skill-category-card');
    skillCards.forEach(card => {
        fadeObserver.observe(card);
    });


    /* ==========================================
       NUMERICAL COUNTERS FOR ACHIEVEMENTS
       ========================================== */
    const counters = document.querySelectorAll('.counter');
    
    const startCounterAnimation = (counterElement) => {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; 
        const frameRate = 1000 / 60; 
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const animate = () => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);

            counterElement.textContent = currentValue;

            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                counterElement.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    };

    const achievementsSection = document.getElementById('achievements');
    let countersStarted = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                counters.forEach(counter => startCounterAnimation(counter));
                countersStarted = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    if (achievementsSection) {
        counterObserver.observe(achievementsSection);
    }


    /* ==========================================
       HERO TYPEWRITER ANIMATION
       ========================================== */
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const wordsArray = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        const type = () => {
            const currentWord = wordsArray[wordIndex];
            
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            currentText = currentWord.substring(0, charIndex);
            typewriterElement.textContent = currentText;

            let typingSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % wordsArray.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        };

        setTimeout(type, 1000);
    }


    /* ==========================================
       CANVAS PARTICLES NETWORK DESIGN (DUAL ACCENT)
       ========================================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    };

    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y, vx, vy, size, color) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            this.x += this.vx;
            this.y += this.vy;

            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = dx / distance;
                    let directionY = dy / distance;
                    
                    this.x += directionX * force * 3;
                    this.y += directionY * force * 3;
                }
            }

            this.draw();
        }
    }

    const initParticles = () => {
        particles = [];
        const isDesktop = window.innerWidth > 900;
        const particleCount = isDesktop ? 80 : 35;
        const colors = ['rgba(0, 229, 255, 0.15)', 'rgba(255, 0, 127, 0.15)', 'rgba(41, 121, 255, 0.1)'];

        for (let i = 0; i < particleCount; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const vx = (Math.random() - 0.5) * 0.4;
            const vy = (Math.random() - 0.5) * 0.4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particles.push(new Particle(x, y, vx, vy, size, color));
        }
    };

    const connectParticles = () => {
        const isDesktop = window.innerWidth > 900;
        const maxDistance = isDesktop ? 120 : 80;

        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    let opacity = (1 - (distance / maxDistance)) * 0.08;
                    ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => p.update());
        connectParticles();

        requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    animateParticles();

    /* ==========================================
       CONTACT FORM TRANSMISSION CHANNELS (XSS PROTECTED)
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const rawName = document.getElementById('form-name').value;
            const rawEmail = document.getElementById('form-email').value;
            const rawMessage = document.getElementById('form-message').value;

            // Escaping function for XSS protection
            const escapeHTML = (str) => {
                return str.replace(/[&<>'"]/g, 
                    tag => ({
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        "'": '&#39;',
                        '"': '&quot;'
                    }[tag] || tag)
                );
            };

            const cleanName = escapeHTML(rawName);
            const cleanEmail = escapeHTML(rawEmail);
            const cleanMessage = escapeHTML(rawMessage);

            const subject = encodeURIComponent(`Secure Contact from ${cleanName}`);
            const body = encodeURIComponent(`Sender Name: ${cleanName}\nSender Email: ${cleanEmail}\n\nMessage Payload:\n${cleanMessage}`);

            // Channel Links
            const mailtoLink = `mailto:shrazzz06@gmail.com?subject=${subject}&body=${body}`;
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=shrazzz06@gmail.com&su=${subject}&body=${body}`;

            // Reset submit button and present channels
            formFeedback.className = 'form-feedback-message success';
            formFeedback.innerHTML = `
                <div style="margin-top: 1.5rem; text-align: left; background: rgba(0, 229, 255, 0.03); border: 1px dashed var(--color-cyan); padding: 1.2rem; border-radius: 4px;">
                    <span style="font-family: var(--font-primary); font-size: 0.9rem; color: var(--color-cyan); display: block; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 1px;"><i class="fa-solid fa-circle-check"></i> Payload Encrypted. Select Channel:</span>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                        <a href="${mailtoLink}" class="btn btn-primary" style="text-align: center; font-size: 0.9rem; padding: 0.75rem; text-decoration: none;"><i class="fa-solid fa-desktop"></i> Channel Alpha (Default Mail App)</a>
                        <a href="${gmailLink}" target="_blank" class="btn btn-outline" style="text-align: center; font-size: 0.9rem; padding: 0.75rem; text-decoration: none;"><i class="fa-brands fa-google"></i> Channel Beta (Web Gmail)</a>
                    </div>
                </div>
            `;
        });
    }

});
