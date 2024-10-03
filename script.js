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
    const cachedData = localStorage.getItem('githubProjects');
    if (cachedData) {
        displayProjects(JSON.parse(cachedData));
    } else {
        fetch('https://api.github.com/users/daniissac/repos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('GitHub API request failed');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('githubProjects', JSON.stringify(data));
                displayProjects(data);
            })
            .catch(error => {
                console.error('Error fetching GitHub projects:', error);
                const projectsContainer = document.getElementById('projects-container');
                projectsContainer.innerHTML = '<p>Unable to load projects at this time. Please try again later.</p>';
            });
    }
}

function displayProjects(data) {
    const projectsContainer = document.getElementById('projects-container');
    data.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'bg-black p-4 rounded shadow';
        projectCard.innerHTML = `
            <h3 class="text-lg font-bold">${repo.name}</h3>
            <p class="text-sm text-gray-600">${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank" class="text-blue-500 hover:underline">View on GitHub</a>
        `;
        projectsContainer.appendChild(projectCard);
    });
}