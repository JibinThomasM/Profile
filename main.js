/*=========================== toggle icon navbar ===========================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/*=========================== Scroll section active link ===========================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })

    /*=========================== Scroll section active link ===========================*/

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*=========================== remove toggle icon and navbar ===========================*/

    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/*=========================== Scroll Reveal ===========================*/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

/*=========================== typed js ===========================*/
const typed = new Typed('.multiple-text', {
    strings: ['Software Engineer', 'Front-end Developer', 'Web Developer', 'Full Stack Dot Net Developer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
});


/*=========================== Read more button ===========================*/

// For about section
function toggleReadMore() {
    const currentText = event.target.parentNode.querySelector('#readMore');
    currentText.classList.toggle('hideReadMore');
    document.querySelector('#btnReadMe').textContent = document.querySelector('#btnReadMe').textContent.includes('Read more') ? 'Read less' : 'Read more';
}

// For Service section : web development
function toggleReadMoreWeb() {
    const currentText = event.target.parentNode.querySelector('#webDevelopment');
    currentText.classList.toggle('hideReadMore');
    document.querySelector('#btnWebDevelopment').textContent = document.querySelector('#btnWebDevelopment').textContent.includes('Read More') ? 'Read less' : 'Read More';
}

// For Service section : Software Development
function toggleReadMoreSw() {
    const currentText = event.target.parentNode.querySelector('#softWareDevelopment');
    currentText.classList.toggle('hideReadMore');
    document.querySelector('#btnSoftwareDevelopment').textContent = document.querySelector('#btnSoftwareDevelopment').textContent.includes('Read More') ? 'Read less' : 'Read More';
}

// For Service section : App development
function toggleReadMoreApp() {
    const currentText = event.target.parentNode.querySelector('#appDevelopment');
    currentText.classList.toggle('hideReadMore');
    document.querySelector('#btnAppDevelopment').textContent = document.querySelector('#btnAppDevelopment').textContent.includes('Read More') ? 'Read less' : 'Read More';
}