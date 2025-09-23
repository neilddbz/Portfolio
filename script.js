/* ------------------ Popup Modal ------------------ */
function createPopup(imageSrc, title){
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');

    const popup = document.createElement('div');
    popup.classList.add('popup-content');

    popup.innerHTML = `
        <span class="popup-close">&times;</span>
        <img src="${imageSrc}" alt="${title}">
        <h3 style="margin-top:10px;">${title}</h3>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    overlay.querySelector('.popup-close').addEventListener('click', ()=>{
        document.body.removeChild(overlay);
        document.body.style.overflow = "auto";
    });

    overlay.addEventListener('click', (e)=>{
        if(e.target === overlay){
            document.body.removeChild(overlay);
            document.body.style.overflow = "auto";
        }
    });
}

/* ------------------ Scroll Animation & Active Nav ------------------ */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

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

    /* Active nav highlight */
    let current = "";
    sections.forEach(section=>{
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if(pageYOffset >= sectionTop - sectionHeight/3){
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link=>{
        link.classList.remove("active");
        if(link.getAttribute("href").includes(current) && current !== "contact"){
            link.classList.add("active");
        }
    });
}

/* ------------------ Smooth Scroll ------------------ */
navLinks.forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ------------------ Hamburger Toggle ------------------ */
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-links');
hamburger.addEventListener('click', ()=>{ navList.classList.toggle('active'); });

/* ------------------ Typed Effect (Hero) ------------------ */
const typedText = document.getElementById('typed-text');
const words = ["NOC Engineer","Former Field Service Engineer / ATM Technician","Former IT Support Intern"];
let wordIndex = 0, letterIndex = 0, isDeleting = false;

function type(){
    if(wordIndex >= words.length) wordIndex = 0;
    const currentWord = words[wordIndex];
    if(isDeleting){
        typedText.textContent = currentWord.substring(0, letterIndex--);
        if(letterIndex < 0){ isDeleting = false; wordIndex++; setTimeout(type,500); return; }
    } else {
        typedText.textContent = currentWord.substring(0, letterIndex++);
        if(letterIndex > currentWord.length){ isDeleting = true; setTimeout(type,1000); return; }
    }
    setTimeout(type, isDeleting ? 100 : 150);
}

/* ------------------ Attach Popup to Cards ------------------ */
document.querySelectorAll('.skill-card, .education-card, .experience-card, .certificate-card').forEach(card=>{
    const imgTag = card.querySelector('img');
    if(imgTag){
        const img = imgTag.src;
        const titleEl = card.querySelector('h3') ? card.querySelector('h3').innerText : 'Detail';
        card.addEventListener('click', ()=>{ createPopup(img, titleEl); });
    }
});

/* ------------------ Back to Top Button ------------------ */
const backToTop = document.createElement('div');
backToTop.id = 'back-to-top';
backToTop.innerHTML = `<i class='bx bx-chevron-up'></i>`;
document.body.appendChild(backToTop);

backToTop.addEventListener('click', ()=>{ window.scrollTo({ top: 0, behavior: 'smooth' }); });
window.addEventListener('scroll', ()=>{ backToTop.style.display = window.scrollY > 400 ? 'flex':'none'; });

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
        alert('Please enter a valid contact number'); 
        e.preventDefault(); 
        return; 
    }
});

/* ------------------ Footer Typing (looping) ------------------ */
const footerName = document.getElementById('footer-name');
const fullName = "Neil Daryl Benitez";
let fnIndex = 0;
let isDeletingFooter = false;

function typeFooterLoop() {
    if(!isDeletingFooter){
        footerName.textContent = fullName.substring(0, fnIndex++);
        if(fnIndex > fullName.length){
            isDeletingFooter = true;
            setTimeout(typeFooterLoop, 1000); 
            return;
        }
    } else {
        footerName.textContent = fullName.substring(0, fnIndex--);
        if(fnIndex < 0){
            isDeletingFooter = false;
            setTimeout(typeFooterLoop, 500); 
            return;
        }
    }
    setTimeout(typeFooterLoop, isDeletingFooter ? 100 : 150);
}

/* ------------------ Initialize ------------------ */
window.addEventListener("load", ()=>{
    scrollAnimate();
    type();
    typeFooterLoop();
});
window.addEventListener("scroll", scrollAnimate);
