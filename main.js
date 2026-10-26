/* ============================================================
   JIBIN THOMAS PORTFOLIO — MAIN JS
   ============================================================ */

'use strict';

/* ============================================================
   PRELOADER
   ============================================================ */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        // Trigger initial reveal animations
        revealOnScroll();
    }, 2000);
});

document.body.style.overflow = 'hidden';

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursorDot     = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
});

// Smooth outline following
function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top  = outlineY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .chip, .stat-card, .portfolio-card, .service-card, .timeline-content');
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
});

/* ============================================================
   HEADER — SCROLL EFFECT + STICKY
   ============================================================ */
const header = document.getElementById('header');

function handleHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 80);
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

/* ============================================================
   MOBILE MENU
   ============================================================ */
const menuBtn = document.getElementById('menuBtn');
const navbar  = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
});

// Close on nav link click
navbar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Close on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        navbar.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function setActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
        const top    = sec.offsetTop;
        const height = sec.offsetHeight;
        const id     = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

/* ============================================================
   PARTICLES BACKGROUND
   ============================================================ */
const particlesBg = document.getElementById('particlesBg');

function createParticles() {
    const count = 40;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size     = Math.random() * 3 + 1;
        const left     = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay    = Math.random() * 10;
        const opacity  = Math.random() * 0.4 + 0.1;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            opacity: 0;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        particlesBg.appendChild(particle);
    }
}

createParticles();

/* ============================================================
   TYPED TEXT ANIMATION
   ============================================================ */
const typedEl = document.getElementById('typedText');
const strings = [
    'Software Engineer',
    'Full Stack .NET Dev',
    'Front-end Developer',
    'AI Agents Developer',
    'Web Developer',
];

let strIdx  = 0;
let charIdx = 0;
let isDeleting = false;

function typeText() {
    const current = strings[strIdx];
    const speed   = isDeleting ? 50 : 80;

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeText, 1400);
        return;
    }

    if (isDeleting && charIdx === 0) {
        isDeleting = false;
        strIdx = (strIdx + 1) % strings.length;
    }

    setTimeout(typeText, speed);
}

typeText();

/* ============================================================
   SCROLL REVEAL ANIMATIONS
   ============================================================ */
function revealOnScroll() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    revealEls.forEach((el, i) => {
        const rect      = el.getBoundingClientRect();
        const delay     = el.dataset.delay ? parseInt(el.dataset.delay) : (i * 80);
        const threshold = 120;

        if (rect.top < window.innerHeight - threshold) {
            setTimeout(() => {
                el.classList.add('revealed');
                // Trigger skill bars and counters when revealed
                if (el.classList.contains('skills-grid') || el.closest('.skills-grid')) {
                    animateSkillBars();
                }
                if (el.classList.contains('about-content') || el.closest('.about-content')) {
                    animateCounters();
                }
            }, delay);
        }
    });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll();

/* ============================================================
   SKILL BAR ANIMATIONS
   ============================================================ */
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const width = fill.dataset.width;
        setTimeout(() => {
            fill.style.width = width + '%';
        }, 200);
    });
}

// Trigger skill bars when skills section enters viewport
const skillsSection = document.getElementById('skills');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, { threshold: 0.3 });

if (skillsSection) skillObserver.observe(skillsSection);

/* ============================================================
   COUNTER ANIMATIONS
   ============================================================ */
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.stat-num[data-count]');
    counters.forEach(counter => {
        const target   = parseInt(counter.dataset.count);
        const duration = 1800;
        const step     = target / (duration / 16);
        let current    = 0;

        const update = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    });
}

// Trigger counters when about section enters viewport
const aboutSection = document.getElementById('about');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.4 });

if (aboutSection) counterObserver.observe(aboutSection);

/* ============================================================
   CONTACT FORM — SUBMIT FEEDBACK
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const btnLoader   = document.getElementById('btnLoader');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Show loading state
        submitBtn.disabled = true;
        const icon = submitBtn.querySelector('i');
        if (icon) icon.className = '';
        btnLoader.style.display = 'inline-block';
        submitBtn.childNodes[0].textContent = ' Sending...';
    });
}

/* ============================================================
   SMOOTH ANCHOR SCROLLING
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ============================================================
   SERVICE CARD — STAGGERED REVEAL
   ============================================================ */
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, parseInt(delay));
        }
    });
}, { threshold: 0.2 });

serviceCards.forEach(card => serviceObserver.observe(card));

/* ============================================================
   PORTFOLIO CARD — STAGGERED REVEAL
   ============================================================ */
const portfolioCards = document.querySelectorAll('.portfolio-card');
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, parseInt(delay));
        }
    });
}, { threshold: 0.15 });

portfolioCards.forEach(card => portfolioObserver.observe(card));

/* ============================================================
   SECTION TAGS REVEAL
   ============================================================ */
const allRevealEls = document.querySelectorAll('[data-reveal]');
const mainObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, parseInt(delay));
            mainObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

allRevealEls.forEach(el => mainObserver.observe(el));

/* ============================================================
   TILT EFFECT ON CARDS
   ============================================================ */
function addTiltEffect(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect    = card.getBoundingClientRect();
            const x       = e.clientX - rect.left;
            const y       = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

addTiltEffect('.portfolio-card');
addTiltEffect('.service-card');

/* ============================================================
   SCROLL PROGRESS BAR (optional subtle top bar)
   ============================================================ */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #0091ff, #00d4ff);
    z-index: 9999;
    transition: width 0.1s;
    pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = (scrollTop / docHeight) * 100;
    progressBar.style.width = pct + '%';
}, { passive: true });