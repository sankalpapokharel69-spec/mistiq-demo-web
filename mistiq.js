/* =========================================================
   MISTIQ FURNITURE
   Premium Website JavaScript
   Vanilla JavaScript — No Libraries
   ========================================================= */

"use strict";

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const pageLoader = document.getElementById("pageLoader");
const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const backTop = document.getElementById("backTop");

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

const quickViewButtons = document.querySelectorAll(".quick-view");

const quickViewModal = document.getElementById("quickViewModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");

const testimonials = document.querySelectorAll(".testimonial");
const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");
const sliderDots = document.querySelectorAll(".dot");

const counters = document.querySelectorAll(".counter");
const revealElements = document.querySelectorAll(
    ".intro-grid, .section-heading, .category-card, .product-card, .story-image-content, .story-grid, .craft-grid, .custom-box, .testimonial-wrap, .gallery-head, .gallery-item, .contact-grid"
);

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const yearElement = document.getElementById("year");


/* =========================================================
   PAGE LOADER
   ========================================================= */

function hidePageLoader() {
    if (!pageLoader) return;

    pageLoader.classList.add("hidden");

    // Remove the loader from accessibility tree after animation
    setTimeout(() => {
        pageLoader.setAttribute("aria-hidden", "true");
    }, 800);
}

window.addEventListener("load", hidePageLoader);


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Back-to-top button
    if (backTop) {
        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    }
}

window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});

// Run once on page load
handleHeaderScroll();


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function openMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.add("active");
    navMenu.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");

    document.body.classList.add("menu-open");
}


function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");

    document.body.classList.remove("menu-open");
}


function toggleMenu() {
    if (!navMenu) return;

    if (navMenu.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
}


if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}


/* =========================================================
   CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
   ========================================================= */

if (navMenu) {
    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });
}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {
    if (!navMenu || !menuToggle) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (
        navMenu.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedToggle
    ) {
        closeMenu();
    }
});


/* =========================================================
   CLOSE MOBILE MENU ON ESCAPE
   ========================================================= */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


/* =========================================================
   CLOSE MOBILE MENU WHEN RESIZING TO DESKTOP
   ========================================================= */

window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
        closeMenu();
    }
});


/* =========================================================
   PRODUCT FILTER
   ========================================================= */

function filterProducts(category) {
    productCards.forEach((card) => {
        const cardCategory = card.dataset.category;

        if (category === "all" || cardCategory === category) {
            card.classList.remove("hidden");

            // Small visual reset for smoother filtering
            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";

            requestAnimationFrame(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            });
        } else {
            card.classList.add("hidden");
        }
    });
}


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Activate clicked button
        button.classList.add("active");

        // Filter products
        filterProducts(selectedFilter);
    });
});


/* =========================================================
   PRODUCT QUICK VIEW DATA
   ========================================================= */

const productDetails = {
    "Arco Lounge Sofa": {
        description:
            "A refined lounge sofa designed to bring warmth, comfort and character to contemporary living spaces.",
        category: "Living Collection"
    },

    "Forma Dining Table": {
        description:
            "A statement dining table inspired by clean proportions, natural materials and the art of gathering.",
        category: "Dining Collection"
    },

    "Noma Bed": {
        description:
            "A calm, understated bed designed to create a warm and timeless atmosphere in the bedroom.",
        category: "Bedroom Collection"
    }
};


/* =========================================================
   OPEN QUICK VIEW MODAL
   ========================================================= */

function openModal(card) {
    if (!quickViewModal || !card) return;

    const image = card.querySelector(".product-image img");
    const title = card.querySelector(".product-info h3");

    if (!image || !title) return;

    const productName = title.textContent.trim();
    const productData = productDetails[productName];

    // Set image
    modalImage.src = image.src;
    modalImage.alt = image.alt || productName;

    // Set title
    modalTitle.textContent = productName;

    // Set description
    if (productData) {
        modalDescription.textContent = productData.description;
    } else {
        modalDescription.textContent =
            "A refined statement piece designed for contemporary spaces.";
    }

    // Set enquiry link
    if (modalLink) {
        modalLink.href =
            "#contact";

        // Store product name for the contact form
        modalLink.dataset.product = productName;
    }

    // Open modal
    quickViewModal.classList.add("open");
    quickViewModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    // Focus close button for keyboard accessibility
    if (modalClose) {
        setTimeout(() => {
            modalClose.focus();
        }, 50);
    }
}


/* =========================================================
   CLOSE QUICK VIEW MODAL
   ========================================================= */

function closeModal() {
    if (!quickViewModal) return;

    quickViewModal.classList.remove("open");
    quickViewModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    // Clear image after transition
    setTimeout(() => {
        if (!quickViewModal.classList.contains("open")) {
            modalImage.src = "";
        }
    }, 350);
}


/* =========================================================
   QUICK VIEW BUTTON EVENTS
   ========================================================= */

quickViewButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const card = button.closest(".product-card");

        openModal(card);
    });
});


/* =========================================================
   MODAL CLOSE EVENTS
   ========================================================= */

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
}


/* =========================================================
   ESCAPE KEY FOR MODAL
   ========================================================= */

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        quickViewModal &&
        quickViewModal.classList.contains("open")
    ) {
        closeModal();
    }
});


/* =========================================================
   MODAL ENQUIRY BUTTON
   ========================================================= */

if (modalLink) {
    modalLink.addEventListener("click", () => {
        const productName = modalLink.dataset.product;

        closeModal();

        // Give the page a moment to close the modal
        setTimeout(() => {
            const messageField = document.querySelector(
                'textarea[name="message"]'
            );

            if (messageField && productName) {
                messageField.value =
                    `I'm interested in the ${productName}. Please provide more details.`;

                messageField.focus();
            }
        }, 400);
    });
}


/* =========================================================
   TESTIMONIAL SLIDER
   ========================================================= */

let currentTestimonial = 0;
let testimonialInterval;


function showTestimonial(index) {
    if (!testimonials.length) return;

    // Handle negative index
    if (index < 0) {
        currentTestimonial = testimonials.length - 1;
    }

    // Handle index beyond last slide
    else if (index >= testimonials.length) {
        currentTestimonial = 0;
    }

    else {
        currentTestimonial = index;
    }

    // Update testimonial
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle(
            "active",
            i === currentTestimonial
        );
    });

    // Update dots
    sliderDots.forEach((dot, i) => {
        dot.classList.toggle(
            "active",
            i === currentTestimonial
        );
    });
}


function nextSlide() {
    showTestimonial(currentTestimonial + 1);
}


function previousSlide() {
    showTestimonial(currentTestimonial - 1);
}


if (nextTestimonial) {
    nextTestimonial.addEventListener("click", () => {
        nextSlide();
        restartTestimonialAutoplay();
    });
}


if (prevTestimonial) {
    prevTestimonial.addEventListener("click", () => {
        previousSlide();
        restartTestimonialAutoplay();
    });
}


sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showTestimonial(index);
        restartTestimonialAutoplay();
    });
});


/* =========================================================
   TESTIMONIAL AUTOPLAY
   ========================================================= */

function startTestimonialAutoplay() {
    if (testimonials.length <= 1) return;

    testimonialInterval = setInterval(() => {
        nextSlide();
    }, 6000);
}


function stopTestimonialAutoplay() {
    clearInterval(testimonialInterval);
}


function restartTestimonialAutoplay() {
    stopTestimonialAutoplay();
    startTestimonialAutoplay();
}


if (testimonials.length > 1) {
    startTestimonialAutoplay();
}


/* =========================================================
   PAUSE TESTIMONIAL AUTOPLAY ON HOVER
   ========================================================= */

const testimonialSlider = document.getElementById(
    "testimonialSlider"
);

if (testimonialSlider) {
    testimonialSlider.addEventListener(
        "mouseenter",
        stopTestimonialAutoplay
    );

    testimonialSlider.addEventListener(
        "mouseleave",
        startTestimonialAutoplay
    );
}


/* =========================================================
   KEYBOARD ACCESSIBILITY FOR TESTIMONIALS
   ========================================================= */

document.addEventListener("keydown", (event) => {
    if (!testimonialSlider) return;

    // Don't interfere while user is typing
    const activeElement = document.activeElement;

    if (
        activeElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(
            activeElement.tagName
        )
    ) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextSlide();
        restartTestimonialAutoplay();
    }

    if (event.key === "ArrowLeft") {
        previousSlide();
        restartTestimonialAutoplay();
    }
});


/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

function animateCounter(counter) {
    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target)) return;

    const duration = 1600;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        // Ease-out animation
        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
            easedProgress * target
        );

        counter.textContent =
            currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent =
                target.toLocaleString();
        }
    }

    requestAnimationFrame(updateCounter);
}


/* =========================================================
   COUNTER OBSERVER
   ========================================================= */

if (counters.length) {
    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);

                    // Run only once
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   BACK TO TOP
   ========================================================= */

if (backTop) {
    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
   SMOOTH ANCHOR NAVIGATION
   ========================================================= */

const anchorLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
);


anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId) return;

        const targetElement =
            document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();

        const headerHeight = header
            ? header.offsetHeight
            : 0;

        const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});


/* =========================================================
   CONTACT FORM
   ========================================================= */

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);

        const name = formData.get("name")?.toString().trim();
        const phone = formData.get("phone")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const service = formData.get("service")?.toString().trim();
        const message = formData.get("message")?.toString().trim();

        // Validation
        if (!name || !phone || !email || !service || !message) {
            showFormMessage("Please complete all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showFormMessage("Please enter a valid email address.");
            return;
        }

        // Your WhatsApp number
        // IMPORTANT: use country code without + or spaces
        const whatsappNumber = "977XXXXXXXXXX";

        // Create WhatsApp message
        const whatsappMessage =
`Hello MISTIQ Furniture,

I would like to make an inquiry.

Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}

Message:
${message}

Thank you.`;

        // Convert message into URL format
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp URL
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Show success message
        showFormMessage("Opening WhatsApp...");

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

        // Reset form
        contactForm.reset();

        setTimeout(() => {
            if (formStatus) {
                formStatus.textContent = "";
            }
        }, 5000);
    });
}

/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* =========================================================
   PREVENT IMAGE DRAGGING
   ========================================================= */

const allImages = document.querySelectorAll("img");

allImages.forEach((image) => {
    image.setAttribute("draggable", "false");
});


/* =========================================================
   REDUCED MOTION SUPPORT
   ========================================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);
if (prefersReducedMotion.matches) {
    // Stop testimonial autoplay
    stopTestimonialAutoplay();
    // Make reveal elements immediately visible
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}
/* =========================================================
   VISIBILITY CHANGE
   Pause autoplay when browser tab isn't visible.
   ========================================================= */
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopTestimonialAutoplay();
    } else if (!prefersReducedMotion.matches) {
        startTestimonialAutoplay();
    }
});
/* =========================================================
   INITIALIZE
   ========================================================= */
showTestimonial(0);
console.log(
    "MISTIQ Furniture website initialized successfully."
);