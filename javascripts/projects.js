const grid = document.getElementById("projectsGrid");

const modal = document.getElementById("projectModal");
const title = document.getElementById("modalTitle");
const video = document.getElementById("modalVideo");
const description = document.getElementById("modalDescription");
const role = document.getElementById("modalRole");
const skills = document.getElementById("modalSkills");
const closeBtn = document.querySelector(".close");

/* LOAD JSON */
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