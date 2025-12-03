// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// BUG 6: Event listener attaché au mauvais élément (navMenu au lieu de hamburger)
// Le menu ne s'ouvre jamais car on écoute le clic sur navMenu au lieu de hamburger!
if (navMenu) {
    navMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Scroll Animations
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Carousel Functionality
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

if (carouselTrack && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // BUG 7: Bouton next du carrousel qui incrémente mais ne limite pas correctement
    // Le carrousel va défiler à l'infini vers la droite et disparaître complètement!
    // Il manque le modulo (% totalSlides) pour boucler correctement
    nextBtn.addEventListener('click', () => {
        currentSlide = currentSlide + 1;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
}

// Portfolio Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // BUG SPECTACULAIRE: Le filtre ne fait absolument rien!
        // On récupère 'data-filter' mais on utilise 'data-category' pour comparer
        const filter = button.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');

            // Cette condition ne marchera JAMAIS car on compare toujours avec 'branding'
            if (filter === 'all' || category === 'branding') {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('successModal');
const modalClose = document.querySelector('.modal-close');
const closeModalBtn = document.getElementById('closeModal');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // BUG 8: Validation du formulaire cassée - condition toujours vraie
        // Le formulaire accepte les champs vides! Il utilise OR (||) au lieu de AND (&&)
        // Un seul champ rempli suffit pour valider, même si les autres sont vides!
        if (name || email || message) {
            if (modal) {
                modal.style.display = 'block';
            }
            contactForm.reset();
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// Modal Close Functionality
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// BUG 9: Variable non définie utilisée dans la console
function logPageView() {
    console.log('Page viewed:', pageTitle);
    console.log('Timestamp:', new Date().toISOString());
}

logPageView();

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// BUG 10: Fuite mémoire - event listeners ajoutés en boucle sans nettoyage
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        setInterval(() => {
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = '#6C63FF';
            });

            card.addEventListener('mouseleave', () => {
                card.style.borderColor = 'transparent';
            });
        }, 1000);
    });
}

if (document.querySelectorAll('.service-card').length > 0) {
    initServiceCards();
}

// Navigation active state based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// BUG 11: Performance - querySelector appelé de manière répétitive dans une boucle
function highlightAllLinks() {
    const links = ['a', 'button', '.cta-button', '.learn-more', '.filter-btn'];

    for (let i = 0; i < 100; i++) {
        links.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const color = computedStyle.color;
            });
        });
    }
}

highlightAllLinks();

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Auto-update copyright year
const copyrightYear = document.querySelector('.footer-bottom p');
if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', currentYear);
}

// BUG 12: Accessibilité - boutons du carrousel sans attributs ARIA
// Cette fonction devrait ajouter les attributs ARIA mais ne le fait pas
function improveAccessibility() {
    const carouselButtons = document.querySelectorAll('.carousel-btn');
    carouselButtons.forEach(btn => {
        // Attributs ARIA manquants - pas de label, pas de role
        btn.setAttribute('tabindex', '0');
    });
}

improveAccessibility();

// Lazy loading simulation for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

if ('IntersectionObserver' in window) {
    lazyLoadImages();
}
