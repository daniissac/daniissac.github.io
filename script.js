document.addEventListener('DOMContentLoaded', function() {
    // Typed.js initialization
    const sections = document.querySelectorAll('.section');
    const typed = new Typed('#typed-text', {
        strings: ['Network Support Engineer', 'Problem Solver', 'Consulting Engineer'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Intersection observer setup
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

    // Timeline animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }

    // GitHub projects fetch
    fetchGitHubProjects();

    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#64ffda'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#64ffda',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Custom cursor initialization
    const cursor = document.createElement('div');
    const cursorTrail = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);

    document.addEventListener('mousemove', e => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        });
    });
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
                const filteredProjects = data.filter(project => 
                    project.name !== 'daniissac'
                );
                const projectsWithPages = filteredProjects.map(project => ({
                    ...project,
                    html_url: `https://github.com/daniissac/${project.name}`
                }));
                localStorage.setItem('githubProjects', JSON.stringify(projectsWithPages));
                displayProjects(projectsWithPages);
            })
            .catch(error => {
                console.error('Error fetching GitHub projects:', error);
            });
    }
}

function displayProjects(data) {
    const projectsContainer = document.getElementById('projects-container');
    data.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'glass-card project-card bg-black p-4 rounded shadow';
        projectCard.innerHTML = `
            <h3 class="text-lg font-bold">${repo.name}</h3>
            <p class="text-sm text-gray-600">${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank" class="text-blue-500 hover:underline">View</a>
        `;
        projectsContainer.appendChild(projectCard);
    });

    // Initialize vanilla-tilt
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 300,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05
    });
}
