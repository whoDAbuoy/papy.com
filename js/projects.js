document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    let currentSlide = 0;
    let slideInterval;
    let filteredProjects = [...projects];

    function showSlide(index) {
        projects.forEach((project, i) => {
            project.style.display = 'none';
            project.classList.remove('active');
        });

        if (filteredProjects[index]) {
            filteredProjects[index].style.display = 'grid';
            setTimeout(() => {
                filteredProjects[index].classList.add('active');
            }, 50);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % filteredProjects.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            filteredProjects = filter === 'all' ? [...projects] : [...projects].filter(project => project.dataset.category === filter);

            currentSlide = 0;
            showSlide(currentSlide);
            stopSlideshow();

            if (filter === 'all') {
                startSlideshow();
            }
        });
    });

    // Initialize slideshow for "All" filter
    showSlide(currentSlide);
    startSlideshow();

    // Pause on hover
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.addEventListener('mouseenter', stopSlideshow);
    projectGrid.addEventListener('mouseleave', startSlideshow);
});