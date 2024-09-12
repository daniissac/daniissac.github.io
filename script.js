document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const typed = new Typed('#typed-text', {
        strings: ['Network Support Engineer', 'Cloud Support Engineer', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
