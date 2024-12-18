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
            skills: ["javascript", "node", "git", "markdown"]
        },
        {
            name: "Christ In Song",
            description: "A multi-lingual adventist Hymn. I contribute languages on this app.",
            image: "cis.jpeg",
            github: "https://github.com/Burkifa23/cis-hymnals",
            demo: "https://play.google.com/store/apps/details?id=com.tinashe.christInSong&hl=en-US",
            skills: ["python", "markdown"]
        }
        /*
        {
            name: "Project 3",
            description: "A brief description of Project 3",
            image: "project3.jpg",
            github: "https://github.com/yourusername/project3",
            demo: "https://project3-demo.com",
            skills: ["python", "javascript"]
        }
        */
    ];

    // Create filter buttons
    const skills = [...new Set(projects.flatMap(project => project.skills))];
    skills.forEach(skill => {
        const button = document.createElement('button');
        button.textContent = skill;
        button.classList.add('button', 'button-outline');
        button.addEventListener('click', () => filterProjects(skill));
        projectFilter.appendChild(button);
    });

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
                <img src="${project.image}" alt="${project.name}" class="project-image">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github}" class="button button-outline" target="_blank">GitHub</a>
                        <a href="${project.demo}" class="button button-primary" target="_blank">Live Demo</a>
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