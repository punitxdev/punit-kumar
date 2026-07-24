document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    highlightActiveNav();
    initMobileNav();
    initTypewriter();
    initSkillsFilter();
    initProjectsPage();
    initContactForm();
});

/* =========================================
   LIGHT / DARK NEUMORPHIC THEME SWITCHER
   ========================================= */
function initThemeSwitcher() {
    // Default to 'light' for classic soft slate Neumorphism unless saved as 'dark'
    const savedTheme = localStorage.getItem('neu-theme') || 'light';
    applyTheme(savedTheme);

    const themeToggleBtns = document.querySelectorAll('.neu-theme-toggle');
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('neu-theme', newTheme);
        });
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggleBtns = document.querySelectorAll('.neu-theme-toggle');
    themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
                btn.setAttribute('aria-label', 'Switch to Light Mode');
            } else {
                icon.className = 'fas fa-moon';
                btn.setAttribute('aria-label', 'Switch to Dark Mode');
            }
        }
    });
}

/* =========================================
   NAVIGATION & ACTIVE STATE DETECTION
   ========================================= */
function highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-drawer a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

function initMobileNav() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const drawer = document.querySelector('.mobile-nav-drawer');

    if (menuBtn && drawer) {
        menuBtn.addEventListener('click', () => {
            drawer.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if (drawer.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
}

/* =========================================
   TYPEWRITER EFFECT (HOME HERO)
   ========================================= */
function initTypewriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const phrases = [
        "Full Stack Developer",
        "IIT Dharwad Student",
        "Machine Learning Enthusiast",
        "Physics Simulator",
        "Competitive Programmer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at full text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* =========================================
   SKILLS CATEGORY FILTERING (SKILLS PAGE)
   ========================================= */
function initSkillsFilter() {
    const skillTabs = document.querySelectorAll('.skill-filter-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    if (skillTabs.length === 0 || skillCards.length === 0) return;

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* =========================================
   PROJECTS SHOWCASE & GITHUB API (PROJECTS PAGE)
   ========================================= */
let allProjects = [];

const fallbackProjects = [
    {
        name: "Fire Detection Model",
        description: "Computer vision and machine learning model designed to detect wildfire and smoke hazards using spatial image analysis.",
        html_url: "https://github.com/punitxdev/fire-detection-model",
        homepage: "",
        topics: ["machine-learning", "python", "computer-vision", "ai"],
        category: "ai"
    },
    {
        name: "Physics Motion Simulator",
        description: "Interactive HTML5 canvas physics engine visualizing helical particle trajectories, rotational mechanics, and photoelectric dynamics.",
        html_url: "https://github.com/punitxdev/physics-simulations",
        homepage: "",
        topics: ["physics", "javascript", "canvas", "simulation"],
        category: "ai"
    },
    {
        name: "LeetCode Solutions Repository",
        description: "Comprehensive library of 200+ algorithm solutions written in optimal C++ and Python covering DP, Graphs, and Trees.",
        html_url: "https://github.com/punitxdev/LeetCode-DSA",
        homepage: "",
        topics: ["algorithms", "cpp", "leetcode", "dsa"],
        category: "cp"
    },
    {
        name: "General Championship Portal",
        description: "Event management and scoring dashboard built for inter-departmental competitions and live leaderboard tracking.",
        html_url: "https://github.com/punitxdev/gc-portal",
        homepage: "",
        topics: ["web", "javascript", "express", "mongodb"],
        category: "web"
    }
];

function initProjectsPage() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    fetchGitHubProjects();

    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterAndRenderProjects(query, getActiveProjectCategory());
        });
    }

    const projectTabs = document.querySelectorAll('.project-filter-tab');
    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            projectTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');
            const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
            filterAndRenderProjects(searchVal, category);
        });
    });
}

function getActiveProjectCategory() {
    const activeTab = document.querySelector('.project-filter-tab.active');
    return activeTab ? activeTab.getAttribute('data-category') : 'all';
}

async function fetchGitHubProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
        const response = await fetch('https://api.github.com/users/punitxdev/repos?sort=updated&per_page=30');
        if (!response.ok) throw new Error('Failed to fetch repos');

        const repos = await response.json();
        
        const customDescriptions = {
            "DotExe_GeoSnap_submission": "Interactive geographic mapping and spatial data application developed as a submission for the DotExe hackathon.",
            "QPX": "A comprehensive data preprocessing and algorithmic pipeline library for machine learning workflows.",
            "fire_detection_model": "Computer vision model designed to detect wildfire and smoke hazards using spatial image analysis.",
            "iitdh-gc-frontend": "Frontend interface for the IIT Dharwad General Championship portal, enabling live leaderboard tracking.",
            "iitdh-gc-backend": "Backend REST API and database service powering the IIT Dharwad General Championship portal.",
            "smart-clustering": "Machine learning clustering visualizer to intuitively analyze and group high-dimensional data points.",
            "rotational-motion-simulation": "Interactive HTML5 physics engine simulating and visualizing rotational mechanics.",
            "Helical-Motion-Simulation": "Physics simulation demonstrating the helical trajectories of charged particles in magnetic fields.",
            "stock_market_predictor": "Predictive analytics model leveraging machine learning to forecast stock market trends.",
            "Used-Car-Price-Prediction": "Regression-based machine learning model that accurately estimates the market value of used cars.",
            "text-vault": "A secure text storage application designed for managing sensitive notes and information.",
            "DropDoubt": "An academic collaboration platform where students can seamlessly post and resolve technical doubts.",
            "punit-kumar": "Personal portfolio website built with an authentic Neumorphic design system."
        };

        allProjects = repos.map(repo => {
            const category = determineProjectCategory(repo.name, repo.description || "", repo.topics || []);
            const finalDescription = customDescriptions[repo.name] || repo.description || "Open-source software repository built by Punit Kumar.";
            return {
                name: repo.name,
                description: finalDescription,
                html_url: repo.html_url,
                homepage: repo.homepage || "",
                topics: repo.topics && repo.topics.length > 0 ? repo.topics : [category, repo.language ? repo.language.toLowerCase() : 'code'],
                category: category
            };
        });

        renderProjectsList(allProjects);
    } catch (err) {
        console.warn("GitHub API limit or network error, rendering fallback projects:", err);
        allProjects = fallbackProjects;
        renderProjectsList(allProjects);
    }
}

function determineProjectCategory(name, desc, topics) {
    const text = (name + " " + desc + " " + topics.join(" ")).toLowerCase();
    if (text.includes('ai') || text.includes('ml') || text.includes('learning') || text.includes('physics') || text.includes('vision') || text.includes('model')) {
        return 'ai';
    }
    if (text.includes('dsa') || text.includes('leetcode') || text.includes('algorithm') || text.includes('cpp')) {
        return 'cp';
    }
    return 'web';
}

function filterAndRenderProjects(query, category) {
    const filtered = allProjects.filter(p => {
        const matchesCategory = (category === 'all' || p.category === category);
        const matchesQuery = !query || 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) || 
            p.topics.some(t => t.toLowerCase().includes(query));
        return matchesCategory && matchesQuery;
    });

    renderProjectsList(filtered);
}

function renderProjectsList(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    if (projects.length === 0) {
        container.innerHTML = `
            <div class="neu-card" style="grid-column: 1/-1; padding: 3rem; text-align: center;">
                <i class="fas fa-search-minus" style="font-size: 3rem; color: var(--accent-orange); margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No Matching Projects Found</h3>
                <p style="color: var(--text-muted);">Try adjusting your search keywords or filter category.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = projects.map(p => createNeumorphicProjectCard(p)).join('');
}

function createNeumorphicProjectCard(p) {
    const cardClass = 'neu-card project-card';
    
    let iconClass = 'fas fa-code-branch';
    if (p.category === 'ai') iconClass = 'fas fa-brain';
    if (p.category === 'cp') iconClass = 'fas fa-microchip';
    if (p.category === 'web') iconClass = 'fas fa-layer-group';

    const tagsHtml = p.topics.slice(0, 4).map(t => `<span>#${t}</span>`).join('');
    
    const demoLink = p.homepage ? `
        <a href="${p.homepage}" target="_blank" title="Live Demo" aria-label="Live Demo">
            <i class="fas fa-external-link-alt"></i>
        </a>
    ` : '';

    return `
        <div class="${cardClass}">
            <div class="project-header">
                <div class="project-icon"><i class="${iconClass}"></i></div>
                <div class="project-links">
                    ${demoLink}
                    <a href="${p.html_url}" target="_blank" title="View Source on GitHub" aria-label="GitHub Repository">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <h3 class="project-title">${p.name}</h3>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">
                ${tagsHtml}
            </div>
        </div>
    `;
}

/* =========================================
   CONTACT FORM HANDLER (CONTACT PAGE)
   ========================================= */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();

            showNeumorphicToast(`Thank you, ${name}! Your message has been received.`);
        }, 1200);
    });
}

function showNeumorphicToast(message) {
    let toast = document.querySelector('.toast-neu');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-neu';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}
