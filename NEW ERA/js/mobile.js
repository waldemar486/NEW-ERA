// Mobile Navigation
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.mobileNav = document.getElementById('mobileNav');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        this.mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuToggle.contains(e.target) && !this.mobileNav.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.mobileNav.classList.toggle('active', this.isOpen);
        this.menuToggle.innerHTML = this.isOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    }
    
    closeMenu() {
        this.isOpen = false;
        this.mobileNav.classList.remove('active');
        this.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Touch optimizations for car cards
class TouchOptimizer {
    constructor() {
        this.touchStartY = 0;
        this.init();
    }
    
    init() {
        // Add touch event listeners to car cards
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('touchstart', (e) => this.handleTouchStart(e));
            card.addEventListener('touchend', (e) => this.handleTouchEnd(e, card));
        });
        
        // Prevent zoom on double tap
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }
    
    handleTouchEnd(e, card) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = Math.abs(touchEndY - this.touchStartY);
        
        // Only toggle overlay if it's a tap (not a scroll)
        if (diff < 10) {
            const overlay = card.querySelector('.car-overlay');
            const isVisible = overlay.style.bottom === '0px';
            
            overlay.style.bottom = isVisible ? '-100%' : '0';
        }
    }
}

// Smooth scroll for mobile navigation
function initSmoothScroll() {
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Performance optimizations for mobile
function optimizeForMobile() {
    // Reduce slideshow interval on mobile
    const slideshowInterval = window.innerWidth < 768 ? 4000 : 3000;
    
    // Reinitialize slideshows with new interval
    const slideshows = ['porscheSlideshow', 'lamboSlideshow', 'ferrariSlideshow', 'mclarenSlideshow'];
    
    slideshows.forEach(slideshowId => {
        const slideshow = document.getElementById(slideshowId);
        const images = slideshow.querySelectorAll('.car-image');
        let currentImage = 0;
        
        // Clear existing interval if any
        if (slideshow.interval) {
            clearInterval(slideshow.interval);
        }
        
        // Set new interval
        slideshow.interval = setInterval(() => {
            images[currentImage].classList.remove('active');
            currentImage = (currentImage + 1) % images.length;
            images[currentImage].classList.add('active');
        }, slideshowInterval);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenu();
    new TouchOptimizer();
    initSmoothScroll();
    optimizeForMobile();
    
    // Re-optimize on resize
    window.addEventListener('resize', optimizeForMobile);
});

// Add loading state for better UX
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});