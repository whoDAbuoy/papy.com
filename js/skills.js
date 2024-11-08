// Skills animation
const skillItems = document.querySelectorAll('.skill-item');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const percentage = entry.target.dataset.percentage || '0';
            
            // Animate progress bar
            progressBar.style.transform = `scaleX(${percentage / 100})`;
            
            // Add number counter animation
            const counter = entry.target.querySelector('.skill-percentage');
            if (counter) {
                animateCounter(counter, percentage);
            }
        }
    });
}, {
    threshold: 0.5
});

skillItems.forEach(item => {
    skillsObserver.observe(item);
});

function animateCounter(counter, target) {
    let current = 0;
    const increment = target > 30 ? 2 : 1;
    const interval = 1000 / (target / increment);
    
    const timer = setInterval(() => {
        current += increment;
        counter.textContent = `${current}%`;
        
        if (current >= target) {
            counter.textContent = `${target}%`;
            clearInterval(timer);
        }
    }, interval);
}

// Add hover effects
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.skill-info i');
        icon.style.transform = 'rotate(360deg)';
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.skill-info i');
        icon.style.transform = 'rotate(0deg)';
    });
});