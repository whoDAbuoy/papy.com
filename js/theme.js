const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class for smooth color changes
    body.classList.add('theme-transition');
    
    // Update theme
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 300);
});

// Prevent transition on page load
document.addEventListener('DOMContentLoaded', () => {
    body.classList.add('theme-transition');
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 300);
}); 