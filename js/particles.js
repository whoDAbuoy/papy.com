document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    let currentSlide = 0;
    let slideInterval;
    let filteredProjects = [...projects];

    // Create slide indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slide-indicators';
    document.querySelector('.project-grid').appendChild(indicatorsContainer);

    function updateIndicators() {
        indicatorsContainer.innerHTML = '';
        filteredProjects.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === currentSlide ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    function showSlide(n) {
        filteredProjects.forEach((project, index) => {
            project.style.display = 'none';
            project.classList.remove('active', 'next', 'prev');
        });

        if (filteredProjects[n]) {
            filteredProjects[n].style.display = 'grid';
            setTimeout(() => {
                filteredProjects[n].classList.add('active');
            }, 50);

            // Update indicators
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === n);
            });
        }
    }

    function nextSlide() {
        if (filteredProjects.length > 1) {
            currentSlide = (currentSlide + 1) % filteredProjects.length;
            showSlide(currentSlide);
        }
    }

    function goToSlide(n) {
        currentSlide = n;
        showSlide(n);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        if (filteredProjects.length > 1) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Update filtered projects
            if (filter === 'all') {
                filteredProjects = [...projects];
            } else {
                filteredProjects = [...projects].filter(project => 
                    project.dataset.category === filter
                );
            }

            // Reset slideshow
            currentSlide = 0;
            updateIndicators();
            showSlide(currentSlide);
            resetInterval();
        });
    });

    // Initialize slideshow
    updateIndicators();
    showSlide(0);
    resetInterval();

    // Pause on hover
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.addEventListener('mouseenter', () => clearInterval(slideInterval));
    projectGrid.addEventListener('mouseleave', resetInterval);
}); 