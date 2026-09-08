// Function to open a section and hide the menu
function openSection(sectionId) {
    // Hide the menu
    document.getElementById('menu').classList.add('hidden');
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to go back to menu
function backToMenu() {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the menu
    document.getElementById('menu').classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to reveal the surprise
function revealSurprise() {
    const surpriseBox = document.getElementById('surprise-box');
    const surpriseReveal = document.getElementById('surprise-reveal');
    
    surpriseBox.style.display = 'none';
    surpriseReveal.classList.remove('hidden');
    
    // Create confetti effect
    createConfetti();
}

// Function to open a photo (for future enhancement with actual images)
function openPhoto(element) {
    const photoText = element.querySelector('p').textContent;
    alert(`Opening: ${photoText}\n\nTo add your actual photos:\n1. Replace the placeholder divs with <img> tags\n2. Update the src to point to your image files\n3. Upload images to your repository`);
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
    
    // Create hearts at intervals
    setInterval(createHeart, 500);
    
    // Create some initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// Create confetti effect for surprise reveal
function createConfetti() {
    const colors = ['#ff69b4', '#ffb6c1', '#ff1493', '#ffc0cb'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const duration = Math.random() * 2 + 2;
        const animation = confetti.animate(
            [
                { 
                    transform: 'translateY(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, 
                    opacity: 0 
                }
            ],
            duration * 1000
        );
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Initialize floating hearts when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    
    // Add some interactivity to heart clicks
    document.addEventListener('click', function(e) {
        // Only create hearts on certain elements
        if (e.target.classList.contains('menu-btn') || 
            e.target.closest('.menu-btn') ||
            e.target.classList.contains('reason-card') ||
            e.target.closest('.reason-card')) {
            createHeartBurst(e.clientX, e.clientY);
        }
    });
});

// Create heart burst effect at click location
function createHeartBurst(x, y) {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '10000';
        heart.style.pointerEvents = 'none';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        document.body.appendChild(heart);
        
        // Random direction
        const angle = (i / 8) * Math.PI * 2;
        const distance = 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        // Animate heart burst
        const animation = heart.animate(
            [
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0)`, 
                    opacity: 0 
                }
            ],
            800
        );
        
        animation.onfinish = () => {
            heart.remove();
        };
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Go back to menu on Escape key
        const menu = document.getElementById('menu');
        const sections = document.querySelectorAll('.section');
        
        let anyVisible = false;
        sections.forEach(section => {
            if (!section.classList.contains('hidden')) {
                anyVisible = true;
            }
        });
        
        if (anyVisible) {
            backToMenu();
        }
    }
});

// Add a little animation to menu buttons on load
window.addEventListener('load', function() {
    const menuBtns = document.querySelectorAll('.menu-btn');
    menuBtns.forEach((btn, index) => {
        btn.style.animationDelay = (index * 0.1) + 's';
    });
});

// Function to customize the website
function customizeWebsite() {
    console.log('To customize this website:');
    console.log('1. Replace placeholder photos in the gallery with your actual images');
    console.log('2. Edit the text content in each section with your personal messages');
    console.log('3. Modify the promises, wishes, and dua sections to include your own words');
    console.log('4. Change colors by modifying CSS variables in style.css');
}

// Add mobile menu functionality if needed
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimize for mobile
if (isMobileDevice()) {
    document.body.style.fontSize = '16px'; // Prevents zoom on input
}

// Add visual feedback to clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});

// Function to take a screenshot or download (optional feature)
function downloadAsImage() {
    // This would require html2canvas library
    console.log('To add screenshot functionality, include html2canvas library');
}

// Log message for developers
console.log('%c❤️ Happy Birthday Website ❤️', 'font-size: 20px; color: #ff69b4; font-weight: bold;');
console.log('To customize this website, edit the content in index.html and colors in style.css');
console.log('Add your actual photos to replace the gallery placeholders');
