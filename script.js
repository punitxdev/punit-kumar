// GitHub Username
const GITHUB_USERNAME = 'punitxdev';

// EXCLUDED REPOS (Case Insensitive)
const EXCLUDED_REPOS = ['dropdoubt', 'punit-kumar'];

// FUTURE PROJECT NAME (To highlight it specially)
const FUTURE_PROJECT_NAME = 'buildspherex';

// CUSTOM PROJECT DATA — unique descriptions & tags per repo
const PROJECT_DATA = {
    'buildspherex': {
        description: 'A student-driven platform from IIT Dharwad to turn ideas into real products. BuildSphereX connects builders, enables rapid collaboration, and integrates AI-powered development tools to accelerate innovation from campus to startup.',
        tags: ['React', 'Node.js', 'AI', 'IIT Dharwad']
    },
    'smart-clustering': {
        description: 'An interactive data visualization tool that clusters datasets using K-Means and DBSCAN algorithms, rendering beautiful 2D scatter plots with real-time controls.',
        tags: ['Python', 'Flask', 'ML', 'Data Viz']
    },
    'text-vault': {
        description: 'A sleek and secure text storage web app for saving, organizing, and retrieving notes and code snippets with a beautiful dark UI.',
        tags: ['JavaScript', 'HTML', 'CSS', 'Web App']
    },
    'stock_market_predictor': {
        description: 'An ML-powered stock market prediction tool that uses historical data and trained models to forecast future stock prices with interactive charts.',
        tags: ['Python', 'ML', 'Flask', 'Finance']
    },
    'disease_classifier': {
        description: 'A machine learning web app that predicts diseases based on user-inputted symptoms using trained classification models and a clean UI.',
        tags: ['Python', 'ML', 'Healthcare', 'Flask']
    },
    'data-structures-visualizer': {
        description: 'An educational web tool to visually understand data structures like Stacks, Queues, Linked Lists, and Trees through step-by-step animated operations.',
        tags: ['JavaScript', 'DSA', 'Education', 'Interactive']
    },
    'algorithm-complexity-visualizer': {
        description: 'A Big-O complexity visualizer demonstrating time complexities of popular algorithms with dynamic Chart.js graphs and animated sorting simulations.',
        tags: ['JavaScript', 'DSA', 'Chart.js', 'Education']
    },
    'iitdh-gc-backend': {
        description: 'The backend API server for the IIT Dharwad General Championship platform, handling authentication, scoreboards, and real-time event management.',
        tags: ['Node.js', 'Express', 'MongoDB', 'REST API']
    },
    'iitdh-gc-frontend': {
        description: 'The frontend dashboard for IIT Dharwad General Championship, featuring live scoreboards, team management, and a responsive React-based UI.',
        tags: ['React', 'JavaScript', 'Vercel', 'Full Stack']
    },
    'acadbox': {
        description: 'An academic resource management platform for students to share, discover, and organize study materials, notes, and past papers.',
        tags: ['JavaScript', 'React', 'Node.js', 'Education']
    },
    'iit-dharwad-sports': {
        description: 'A dynamic sports website for IIT Dharwad showcasing events, team rosters, schedules, and live updates for inter-college tournaments.',
        tags: ['JavaScript', 'React', 'CSS', 'Sports']
    },
    'rotational-motion-simulation': {
        description: 'An interactive physics simulation that visualizes rotational motion concepts like angular velocity, torque, and moment of inertia in real-time.',
        tags: ['JavaScript', 'Physics', 'Canvas', 'Simulation']
    },
    'photoelectric-effect-simulation': {
        description: 'A web-based simulation of the photoelectric effect, allowing users to adjust light frequency and intensity to observe electron emission behavior.',
        tags: ['JavaScript', 'Physics', 'Canvas', 'Simulation']
    },
    'helical-motion-simulation': {
        description: 'A 3D-style visualization of charged particle helical motion in a magnetic field, with adjustable parameters for velocity and field strength.',
        tags: ['JavaScript', 'Physics', 'CSS', '3D Viz']
    },
    'cryptoforge': {
        description: 'A modern cryptographic suite with glassmorphism UI for encrypting and decrypting text using AES, Caesar Cipher, and other algorithms.',
        tags: ['HTML', 'JavaScript', 'Crypto', 'Security']
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTypingAnimation();
    fetchGitHubProjects();
});

// Typing Animation — cycles through roles
function initTypingAnimation() {
    const phrases = ["Punit Kumar", "a Web Developer", "an AI/ML Enthusiast", "a Problem Solver", "a Full Stack Builder"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeTarget = document.querySelector('.type-text');
    if (!typeTarget) return;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typeTarget.textContent = currentPhrase.substring(0, charIndex--);
        } else {
            typeTarget.textContent = currentPhrase.substring(0, charIndex++);
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length + 1) {
            speed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }
        
        setTimeout(type, speed);
    }
    
    type();
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Get custom data for a repo
function getProjectData(repoName) {
    const key = repoName.toLowerCase();
    return PROJECT_DATA[key] || null;
}

// Fetch GitHub Projects
async function fetchGitHubProjects() {
    const container = document.getElementById('projects-container');
    
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        
        const allRepos = await response.json();
        
        // Filter out excluded repos
        const repos = allRepos.filter(repo => {
            return !EXCLUDED_REPOS.includes(repo.name.toLowerCase());
        });
        
        if (repos.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No projects found yet. Building awesome things...</p>';
            return;
        }
        
        container.innerHTML = '';
        
        repos.forEach(repo => {
            const isFuture = repo.name.toLowerCase() === FUTURE_PROJECT_NAME;
            const projectCard = createProjectCard(repo, isFuture);
            
            if (isFuture) {
                container.prepend(projectCard);
            } else {
                container.appendChild(projectCard);
            }
        });
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--accent-2);">Failed to load projects. Please try again later.</p>';
        renderMockProjects(container);
    }
}

// Create Project Card Element
function createProjectCard(repo, isFuture) {
    const card = document.createElement('div');
    card.className = isFuture ? 'project-card buildspherex-card' : 'project-card';
    
    // Get custom data
    const customData = getProjectData(repo.name);
    
    // Build tags from custom data, or fallback to language + topics
    let tagsHtml = '';
    if (customData && customData.tags) {
        customData.tags.forEach(tag => {
            tagsHtml += `<span>${tag}</span>`;
        });
    } else {
        if (repo.language) {
            tagsHtml += `<span>${repo.language}</span>`;
        }
        if (repo.topics && repo.topics.length > 0) {
            repo.topics.forEach(topic => {
                tagsHtml += `<span>${topic}</span>`;
            });
        }
    }
    
    // Use custom description, or repo description, or fallback
    const description = (customData && customData.description) 
        ? customData.description 
        : (repo.description || 'An exciting project exploring new technologies. Check out the repository for details!');
    
    const formattedName = formatRepoName(repo.name);
    
    let cardContent = `
        <div class="project-content">
            ${isFuture ? '<div class="future-badge"><i class="fas fa-rocket"></i> Future Project</div>' : ''}
            
            <div class="project-header">
                <div class="project-icon">
                    <i class="fas ${getIconForRepo(repo.name, repo.language)}"></i>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" aria-label="GitHub Repo"><i class="fab fa-github"></i></a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" aria-label="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                </div>
            </div>
            
            <h3 class="project-title">${formattedName}</h3>
            <p class="project-desc">${description}</p>
            
            <div class="project-tags">
                ${tagsHtml || '<span>Code</span>'}
            </div>
        </div>
    `;
    
    card.innerHTML = cardContent;
    return card;
}

// Helper to format repo name
function formatRepoName(name) {
    return name.split(/[-_]/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Helper to get cool icon based on language or name
function getIconForRepo(name, language) {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('ai') || nameLower.includes('machine') || nameLower.includes('intelligence')) return 'fa-brain';
    if (nameLower.includes('data') || nameLower.includes('visual')) return 'fa-chart-pie';
    if (nameLower.includes('algorithm') || nameLower.includes('complexity')) return 'fa-project-diagram';
    if (nameLower.includes('game')) return 'fa-gamepad';
    if (nameLower.includes('crypto')) return 'fa-shield-halved';
    if (nameLower.includes('chat') || nameLower.includes('message')) return 'fa-comments';
    if (nameLower.includes('buildspherex')) return 'fa-globe';
    if (nameLower.includes('stock') || nameLower.includes('market') || nameLower.includes('predict')) return 'fa-chart-line';
    if (nameLower.includes('disease') || nameLower.includes('classif') || nameLower.includes('health')) return 'fa-notes-medical';
    if (nameLower.includes('sport')) return 'fa-futbol';
    if (nameLower.includes('acad')) return 'fa-graduation-cap';
    if (nameLower.includes('text') || nameLower.includes('vault')) return 'fa-file-lines';
    if (nameLower.includes('cluster')) return 'fa-circle-nodes';
    if (nameLower.includes('motion') || nameLower.includes('simul') || nameLower.includes('helical') || nameLower.includes('photo')) return 'fa-atom';
    if (nameLower.includes('gc') && nameLower.includes('backend')) return 'fa-server';
    if (nameLower.includes('gc') && nameLower.includes('frontend')) return 'fa-desktop';
    
    switch(language) {
        case 'JavaScript': return 'fa-js';
        case 'Python': return 'fa-python';
        case 'Java': return 'fa-java';
        case 'HTML': return 'fa-html5';
        case 'CSS': return 'fa-css3-alt';
        case 'C++': return 'fa-cuttlefish';
        default: return 'fa-folder-open';
    }
}

// Fallback Mock Projects
function renderMockProjects(container) {
    const mockRepos = [
        {
            name: "BuildSphereX",
            description: PROJECT_DATA['buildspherex'].description,
            html_url: "https://github.com/punitxdev/buildspherex",
            language: "JavaScript",
            topics: []
        },
        {
            name: "algorithm-complexity-visualizer",
            description: PROJECT_DATA['algorithm-complexity-visualizer'].description,
            html_url: "https://github.com/punitxdev/algorithm-complexity-visualizer",
            language: "JavaScript",
            topics: []
        },
        {
            name: "smart-clustering",
            description: PROJECT_DATA['smart-clustering'].description,
            html_url: "https://github.com/punitxdev/smart-clustering",
            language: "CSS",
            topics: []
        }
    ];
    
    container.innerHTML = '';
    
    mockRepos.forEach(repo => {
        const isFuture = repo.name.toLowerCase() === FUTURE_PROJECT_NAME;
        const projectCard = createProjectCard(repo, isFuture);
        
        if (isFuture) {
            container.prepend(projectCard);
        } else {
            container.appendChild(projectCard);
        }
    });
}
