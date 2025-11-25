// Автоматическая смена фото для каждого автомобиля
function initSlideshows() {
    const slideshows = [
        'porscheSlideshow',
        'lamboSlideshow', 
        'ferrariSlideshow',
        'mclarenSlideshow'
    ];

    slideshows.forEach(slideshowId => {
        const slideshow = document.getElementById(slideshowId);
        const images = slideshow.querySelectorAll('.car-image');
        let currentImage = 0;

        // Меняем фото каждые 3 секунды
        const interval = setInterval(() => {
            images[currentImage].classList.remove('active');
            currentImage = (currentImage + 1) % images.length;
            images[currentImage].classList.add('active');
        }, 3000);

        // Сохраняем interval ID для возможной очистки
        slideshow.interval = interval;
    });
}

// Проверяем загрузку изображений
function checkImages() {
    document.querySelectorAll('.car-image').forEach(img => {
        img.onerror = function() {
            console.log('Ошибка загрузки изображения:', this.src);
        };

        img.onload = function() {
            console.log('Изображение загружено:', this.src);
        };
    });
}

// Smooth scroll for desktop
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initSlideshows();
    checkImages();
    initSmoothScroll();
});