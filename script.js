document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const typed = new Typed('#typed-text', {
        strings: ['Technical Support Engineer', 'Problem Solver', 'Consulting Engineer'],
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
                if (entry.target.id === 'experience') {
                    animateTimeline();
                }
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
});
