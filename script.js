// ========== Custom Cursor Setup ==========
const cursorDot = document.getElementById("cursor-dot");

window.addEventListener("mousemove", function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // The cursor follows the mouse instantly for perfect tracking
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
});

// ========== Scroll Reveal Animation Setup ==========
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        // Get the height of the viewport
        var windowHeight = window.innerHeight;
        // Get distance from top of viewport to the element
        var elementTop = reveals[i].getBoundingClientRect().top;
        // Distance from bottom before element appears
        var elementVisible = 50; 

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            // Optional: remove class to animate again when scrolling up
            // reveals[i].classList.remove("active");
        }
    }
}

// Check on scroll
window.addEventListener("scroll", reveal);

// Also trigger once on page load to show elements already in view
window.onload = reveal;


// ========== Typing Animation ==========
const roles = ["Junior Business Analyst", "B.Tech AI & Data Science Student"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 1000);

// ========== 3D Card Hover Tilt ==========
const bentoItems = document.querySelectorAll('.bento-item');
bentoItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 600) return;
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4; 
        const rotateY = ((x - centerX) / centerX) * 4;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        item.style.transition = 'transform 0.1s ease';
        item.style.zIndex = '10';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        item.style.transition = 'transform 0.5s ease, z-index 0.5s';
        item.style.zIndex = '1';
    });
});

// ========== Magnetic Buttons ==========
const magneticBtns = document.querySelectorAll('.btn, .social-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 600) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
        btn.style.transition = 'transform 0.5s ease';
    });
});
