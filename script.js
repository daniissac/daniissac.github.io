document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initIntersectionObserver();
    initParticles();
    fetchGitHubProjects();
});

// Custom typewriter implementation
function initTypewriter() {
    const texts = ['Technical Content Developer', 'Problem Solver', 'Network Engineer', 'Technical Consultant'];
    const typedTextElement = document.getElementById('typed-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.id === 'experience') {
                    animateTimeline();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300);
    });
}

// Particles background
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-js');
    
    particlesContainer.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;
    const colors = ['#64ffda'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance/150})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// GitHub projects
function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const cachedData = localStorage.getItem('githubProjects');
    const cacheExpiry = localStorage.getItem('githubProjectsExpiry');
    const now = new Date().getTime();

    if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
        displayProjects(JSON.parse(cachedData));
        return;
    }

    fetch('https://api.github.com/users/daniissac/repos')
        .then(response => {
            if (!response.ok) throw new Error('GitHub API request failed');
            return response.json();
        })
        .then(data => {
            const filteredProjects = data
                .filter(project => project.name !== 'daniissac')
                .map(project => ({
                    name: project.name,
                    description: project.description,
                    html_url: `https://github.com/daniissac/${project.name}`
                }));

            // Cache for 1 hour
            localStorage.setItem('githubProjects', JSON.stringify(filteredProjects));
            localStorage.setItem('githubProjectsExpiry', now + (60 * 60 * 1000));
            
            displayProjects(filteredProjects);
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
            projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
        });
}

function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description || 'No description available'}</p>
            <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">View Project →</a>
        `;
        
        // Add tilt effect
        addTiltEffect(card);
        
        projectsGrid.appendChild(card);
    });

    container.appendChild(projectsGrid);
}

// Custom tilt effect
function addTiltEffect(element) {
    let rect = element.getBoundingClientRect();
    let mouseX = 0;
    let mouseY = 0;

    element.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        const xRotation = 20 * ((mouseY - rect.height / 2) / rect.height);
        const yRotation = -20 * ((mouseX - rect.width / 2) / rect.width);
        
        element.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });

    // Update rect on window resize
    window.addEventListener('resize', () => {
        rect = element.getBoundingClientRect();
    });
}
