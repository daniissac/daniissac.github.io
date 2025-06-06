document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initScrollAnimations();
    fetchGitHubProjects();
    initMobileMenu();
    initThemeToggle();
    initScrollProgress();
    initBackToTop();
    initSkillBars();
    initFadeInAnimations();
    initEnhancedHeader();
    
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
    const texts = ['Technical Education Content Developer', 'Network Support Engineer', 'Cisco Certified Professional', 'Network Troubleshooting Expert'];
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
                    html_url: project.html_url || `https://github.com/daniissac/${project.name}`,
                    language: project.language,
                    topics: project.topics || [],
                    stars: project.stargazers_count || 0,
                    updated_at: project.updated_at
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
        
        const languageTag = project.language ? `<span class="language-tag">${project.language}</span>` : '';
        const topicTags = project.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('');
        const starsDisplay = project.stars > 0 ? `<span class="stars">⭐ ${project.stars}</span>` : '';
        const updatedDate = new Date(project.updated_at).toLocaleDateString();
        
        card.innerHTML = `
            <div class="project-header">
                <h3>${project.name}</h3>
                <div class="project-stats">
                    ${starsDisplay}
                    ${languageTag}
                </div>
            </div>
            <p>${project.description}</p>
            <div class="project-tags">
                ${topicTags}
            </div>
            <div class="project-footer">
                <span class="updated-date">Updated: ${updatedDate}</span>
                <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });

    container.appendChild(projectsGrid);
}

// Dark mode toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Scroll progress bar
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.setProperty('--skill-width', skillLevel + '%');
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Fade in animations on scroll
function initFadeInAnimations() {
    const animatedElements = document.querySelectorAll('section, .highlight-item, .skill-category, .timeline-item, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Enhanced header scroll effect
function initEnhancedHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}