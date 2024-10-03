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

    fetchGitHubProjects();
});

function fetchGitHubProjects() {
    fetch('https://api.github.com/users/daniissac/repos')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            data.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.className = 'timeline-item bg-white p-4 rounded shadow-lg mb-4 opacity-0 transform translate-y-4 transition-all duration-300 ease-in-out';
                projectCard.innerHTML = `
                    <h3 class="text-lg font-bold">${repo.name}</h3>
                    <p class="text-sm text-gray-600">${repo.description || 'No description available'}</p>
                    <a href="${repo.html_url}" target="_blank" class="text-blue-500 hover:underline">View on GitHub</a>
                `;
                projectsContainer.appendChild(projectCard);
                
                // Trigger animation
                setTimeout(() => {
                    projectCard.style.opacity = '1';
                    projectCard.style.transform = 'translateY(0)';
                }, 100);
            });
        })
        .catch(error => console.error('Error fetching GitHub projects:', error));
}