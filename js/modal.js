// Project modal functionality
const modal = document.getElementById('projectModal');
const modalContent = modal.querySelector('.modal-body');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const projectData = getProjectData(projectId); // Create this function to fetch project data
        updateModalContent(projectData);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

function updateModalContent(projectData) {
    modalContent.innerHTML = `
        <h2>${projectData.title}</h2>
        <img src="${projectData.image}" alt="${projectData.title}">
        <p>${projectData.description}</p>
        <div class="tech-stack">
            ${projectData.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            <a href="${projectData.liveLink}" class="project-link glow-button">Live Demo</a>
            <a href="${projectData.githubLink}" class="project-link outline">GitHub</a>
        </div>
    `;
}