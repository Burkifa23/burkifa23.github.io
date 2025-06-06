document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentYearSpan = document.getElementById('current-year');
    const projectFilter = document.getElementById('project-filter');
    const projectGrid = document.getElementById('project-grid');

    function toggleTheme() {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark');
    }

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Project data
    const projects = [
        {
            name: "Sabbath School & PM",
            description: "A daily lesson of Sabbath School in Your Language. I actively contribute Kinyarwanda.",
            image: "adventech.png",
            github: "https://github.com/Burkifa23/sabbath-school-lessons",
            demo: "https://sabbath-school.adventech.io/kin",
            skills: ["JavaScript", "Node.js", "Git", "Markdown"]
        },
        {
            name: "Christ In Song",
            description: "A multi-lingual Adventist hymn App. I contributed languages on this app.",
            image: "cis.jpeg",
            github: "https://github.com/Burkifa23/cis-hymnals",
            demo: "https://play.google.com/store/apps/details?id=com.tinashe.christInSong&hl=en-US",
            skills: ["Python", "Markdown"]
        },
        
        {
            name: "Syntaxed",
            description: "A code typing trainer supporting 25+ programming languages. Improve your coding speed and accuracy with real-time metrics, personal statistics, and Monaco Editor integration.",
            image: "full_Logo.png",
            github: "https://github.com/Burkifa23/Syntaxed",
            demo: "https://burkifa23.github.io/Syntaxed",
            skills: ["HTML", "CSS", "JavaScript"]
        }
        
        /*
        {
            name: "Project ",
            description: "A brief description of Project ",
            image: "project3.jpg",
            github: "githb link",
            demo: "live link or download link or video",
            skills: ["python", "javascript"]
        }
        */
    ];

    // Create filter buttons
    const skills = [...new Set(projects.flatMap(project => project.skills))];

    // Add "All" button first
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.classList.add('button', 'button-primary'); // Start as active
    allButton.addEventListener('click', () => {
        filterProjects(null);
        setActiveFilter(allButton);
    });
    projectFilter.appendChild(allButton);

    // Add skill buttons
    skills.forEach(skill => {
        const button = document.createElement('button');
        button.textContent = skill;
        button.classList.add('button', 'button-outline');
        button.addEventListener('click', () => {
            filterProjects(skill);
            setActiveFilter(button);
        });
        projectFilter.appendChild(button);
    });

    // Function to handle active filter styling
    function setActiveFilter(activeButton) {
        document.querySelectorAll('#project-filter .button').forEach(btn => {
            btn.classList.remove('button-primary');
            btn.classList.add('button-outline');
        });
        activeButton.classList.remove('button-outline');
        activeButton.classList.add('button-primary');
    }

    // Function to filter projects
    function filterProjects(skill) {
        const filteredProjects = skill ? projects.filter(project => project.skills.includes(skill)) : projects;
        renderProjects(filteredProjects);
    }

    // Function to render projects
    function renderProjects(projectsToRender) {
        projectGrid.innerHTML = '';
        projectsToRender.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project-item');
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.name}" class="project-image" 
                     onerror="this.src='placeholder-project.jpg'">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github}" class="button button-outline" target="_blank" rel="noopener">GitHub</a>
                        <a href="${project.demo}" class="button button-primary" target="_blank" rel="noopener">Live Demo</a>
                    </div>
                </div>
            `;
            projectGrid.appendChild(projectElement);
        });
    }

    // Initial render of all projects
    renderProjects(projects);

    // Skill animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.animationDelay = `${Math.random() * 2}s`;
    });
});
