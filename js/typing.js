document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('.typed-text', {
        strings: [
            'Full Stack Developer',
            'Web Designer',
            'UI/UX Designer',
            'Software Engineer',
            'Mobile App Developer',
            'Database Administrator'
        ],
        typeSpeed: 50, // Typing speed in milliseconds
        backSpeed: 30, // Backspacing speed in milliseconds
        backDelay: 2000, // Time before backspacing
        startDelay: 1000, // Time before typing starts
        loop: true, // Loop the animation
        showCursor: true, // Show blinking cursor
        cursorChar: '|', // Character for the cursor
        autoInsertCss: true, // Automatically insert CSS
        fadeOut: true, // Fade out effect
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500,
        // Smart backspacing
        smartBackspace: true,
        // Callback when typing starts
        onBegin: (self) => {
            console.log('Typing animation started');
        },
        // Callback before each string is typed
        preStringTyped: (arrayPos, self) => {
            console.log('New string will be typed');
        },
        // Callback after each string is typed
        onStringTyped: (arrayPos, self) => {
            console.log('String typed');
        },
        // Callback when typing is complete
        onComplete: (self) => {
            console.log('All strings typed');
        }
    });
});