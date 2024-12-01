// Contact form handling
const contactForm = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

// Form input animations
formInputs.forEach(input => {
    // Handle label animation
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Set initial state for filled inputs
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();
        
        if (response.ok) {
            // Success
            submitButton.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
            submitButton.style.backgroundColor = '#28a745';
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                submitButton.style.backgroundColor = '';
            }, 3000);
        } else {
            throw new Error(result.error || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        submitButton.innerHTML = '<span>Failed to send</span> <i class="fas fa-exclamation-circle"></i>';
        submitButton.style.backgroundColor = '#dc3545';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            submitButton.style.backgroundColor = '';
        }, 3000);
    }
});