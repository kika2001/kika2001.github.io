function parseItchioData(data) {
    return data.games
        .filter(game => game.published)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(game => ({
            title: game.title,
            url: game.url,
            image: game.cover_url || "",
            description: game.short_text || "No description available"
        }));
}

function renderProjects(projects) {
    const container = document.getElementById("projects");

    projects.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-text">
                <h3>${p.title}</h3>
                <p class="meta">${p.description}</p>
                <a href="${p.url}" target="_blank">View Project</a>
            </div>
            <div class="card-image">
                <img src="${p.image}" alt="${p.title}">
            </div>
        `;

        container.appendChild(card);
    });
}

const grid = document.getElementById("projectsGrid");
const personalgrid = document.getElementById("personalProjectsGrid");

const modal = document.getElementById("projectModal");
const title = document.getElementById("modalTitle");
const video = document.getElementById("modalVideo");
const description = document.getElementById("modalDescription");
const role = document.getElementById("modalRole");
const skills = document.getElementById("modalSkills");
const closeBtn = document.querySelector(".close");

/* LOAD JSON */
// Manually added games (professional games)
fetch("projects.json")
    .then(res => res.json())
    .then(data => {
        data.projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <img src="${project.cover}" alt="${project.title}">
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.subtitle}</p>
                </div>
            `;

            card.addEventListener("click", () => {
                openModal(project);
            });

            grid.appendChild(card);
        });
    });

fetch("my-games.json") // your raw itch data file
    .then(res => res.json())
    .then(data => {
        const projects = parseItchioData(data); // 👈 use parser

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `;

            card.addEventListener("click", () => {
                window.open(project.url, "_blank");
            });

            personalgrid.appendChild(card);
        });
    });

const cover = document.getElementById("modalCover");

function openModal(project) {
    title.textContent = project.title;
    video.src = project.video;
    cover.src = project.cover;
    description.textContent = project.description;
    role.textContent = project.role;
    skills.textContent = project.skills;

    modal.style.display = "block";
}

/* MODAL FUNCTION */
function openModal(project) {
    title.textContent = project.title;
    video.src = project.video;
    description.textContent = project.description;
    role.textContent = project.role;
    skills.textContent = project.skills;

    modal.style.display = "block";
}

/* CLOSE MODAL */
closeBtn.onclick = () => {
    modal.style.display = "none";
    video.src = "";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        video.src = "";
    }
};