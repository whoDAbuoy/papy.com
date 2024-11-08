function initSlideshow() {
    const slideshows = document.querySelectorAll('.slideshow-container');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        const dotsContainer = slideshow.querySelector('.slideshow-dots');
        let currentSlide = 0;
        let isAnimating = false;
        let autoPlayInterval;

        // Set initial positions
        slides.forEach((slide, index) => {
            slide.style.left = `${index * 100}%`;
            slide.style.display = 'block';
        });

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                if (!isAnimating) {
                    clearInterval(autoPlayInterval); // Stop autoplay on user interaction
                    moveToSlide(index);
                    startAutoPlay(); // Restart autoplay
                }
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function moveToSlide(index) {
            if (isAnimating || index === currentSlide) return;
            isAnimating = true;

            // Update dots immediately
            dots[currentSlide].classList.remove('active');
            dots[index].classList.add('active');

            // Calculate movement distance
            const moveAmount = (currentSlide - index) * 100;
            
            // Move all slides
            slides.forEach(slide => {
                const currentLeft = parseFloat(slide.style.left);
                slide.style.transition = 'transform 0.6s ease-in-out';
                slide.style.transform = `translateX(${moveAmount}%)`;
                
                // Reset after animation
                setTimeout(() => {
                    slide.style.transition = 'none';
                    slide.style.left = `${currentLeft + moveAmount}%`;
                    slide.style.transform = 'translateX(0)';
                    isAnimating = false;
                }, 600);
            });

            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            moveToSlide(next);
        }

        // Touch support with improved handling
        let touchStartX = 0;
        let touchStartTime = 0;

        slideshow.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            touchStartTime = Date.now();
            clearInterval(autoPlayInterval); // Stop autoplay during touch
        });

        slideshow.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndTime = Date.now();
            const diff = touchStartX - touchEndX;
            const timeDiff = touchEndTime - touchStartTime;

            // Only trigger if swipe was fast enough and long enough
            if (Math.abs(diff) > 50 && timeDiff < 300) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    const prev = (currentSlide - 1 + slides.length) % slides.length;
                    moveToSlide(prev);
                }
            }
            startAutoPlay(); // Restart autoplay after touch
        });

        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        // Start autoplay
        startAutoPlay();
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initSlideshow);