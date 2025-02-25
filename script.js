document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initScrollAnimations();
    fetchGitHubProjects();
    initMobileMenu();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Toggle hamburger to X animation
        this.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Typewriter effect
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

// Smooth scroll for navigation links
function initScrollAnimations() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
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

    // Show loading indicator
    projectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';

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
                    description: project.description || 'No description available',
                    html_url: project.html_url || `https://github.com/daniissac/${project.name}`
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
    
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p>No projects available at the moment.</p>';
        return;
    }
    
    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">View Project →</a>
        `;
        
        projectsGrid.appendChild(card);
    });

    container.appendChild(projectsGrid);
}