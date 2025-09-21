/* ------------------ Popup Modal for Cards ------------------ */
function createPopup(imageSrc, title, type){
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');

    const popup = document.createElement('div');
    popup.classList.add('popup-content');

    // Set title color for certificates differently
    let titleColor = '#ffffff';
    if(type === 'certificate') titleColor = '#fff';

    popup.innerHTML = `
        <span class="popup-close">&times;</span>
        <img src="${imageSrc}" alt="${title}">
        <h3 style="color:${titleColor}; margin-top:10px;">${title}</h3>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden"; // lock scroll

    overlay.querySelector('.popup-close').addEventListener('click', ()=>{
        document.body.removeChild(overlay);
        document.body.style.overflow = "auto"; // unlock scroll
    });

    overlay.addEventListener('click', (e)=>{
        if(e.target === overlay){
            document.body.removeChild(overlay);
            document.body.style.overflow = "auto"; // unlock scroll
        }
    });
}

/* ------------------ Scroll Animation ------------------ */
const sections = document.querySelectorAll("section");
function scrollAnimate() {
    const triggerBottom = window.innerHeight / 5 * 4;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom){
            section.classList.add("active");
        } else {
            section.classList.remove("active");
        }
    });
}

/* ------------------ Smooth Scroll for Navbar ------------------ */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ------------------ Hamburger Toggle ------------------ */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', ()=>{
    navLinks.classList.toggle('active');
});

/* ------------------ Typed Effect ------------------ */
const typedText = document.getElementById('typed-text');
const words = ["Former Field Service Engineer / ATM Technician", "Former IT Support Intern"];
let wordIndex = 0, letterIndex = 0, isDeleting = false;

function type(){
    if(wordIndex >= words.length) wordIndex = 0;
    const currentWord = words[wordIndex];

    if(isDeleting){
        typedText.textContent = currentWord.substring(0, letterIndex--);
        if(letterIndex < 0){
            isDeleting = false;
            wordIndex++;
            setTimeout(type, 500);
            return;
        }
    } else {
        typedText.textContent = currentWord.substring(0, letterIndex++);
        if(letterIndex > currentWord.length){
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        }
    }
    setTimeout(type, isDeleting ? 100 : 150);
}

/* ------------------ Attach Popup to Cards ------------------ */
document.querySelectorAll('.skill-card, .education-card, .experience-card, .certificate-card').forEach(card=>{
    const imgTag = card.querySelector('img');
    if(imgTag){
        const img = imgTag.src;
        const titleEl = card.querySelector('h3') ? card.querySelector('h3').innerText : 'Detail';
        const type = card.classList.contains('certificate-card') ? 'certificate' : 'normal';
        card.addEventListener('click', ()=>{ createPopup(img, titleEl, type); });
    }
});

/* ------------------ Back to Top Button ------------------ */
const backToTop = document.createElement('div');
backToTop.id = 'back-to-top';
backToTop.innerHTML = `<i class='bx bx-chevron-up'></i>`; // Boxicons arrow
document.body.appendChild(backToTop);

backToTop.addEventListener('click', ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400){
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

/* ------------------ Contact Form Validation ------------------ */
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e){
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const phone = contactForm.querySelector('#phone').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if(!name || !email || !phone || !message){
        alert("Please fill in all fields.");
        e.preventDefault();
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!emailPattern.test(email)){
        alert("Please enter a valid email address.");
        e.preventDefault();
        return;
    }

    const numberPattern = /^(\+63|0)\d{10}$/;
    if(!numberPattern.test(phone)){
        alert('Please enter a valid contact number (e.g., 09123456789 or +639123456789)');
        e.preventDefault();
        return;
    }
});

/* ------------------ Initialize ------------------ */
window.addEventListener("load", ()=>{
    scrollAnimate();
    type();
});

window.addEventListener("scroll", scrollAnimate);
