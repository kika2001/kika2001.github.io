const cards = document.querySelectorAll(".project-card");
const modal = document.getElementById("projectModal");

const title = document.getElementById("modalTitle");
const video = document.getElementById("modalVideo");
const description = document.getElementById("modalDescription");
const role = document.getElementById("modalRole");
const skills = document.getElementById("modalSkills");

const closeBtn = document.querySelector(".close");

cards.forEach(card => {
    card.addEventListener("click", () => {
        title.textContent = card.dataset.title;
        video.src = card.dataset.video;
        description.textContent = card.dataset.description;
        role.textContent = card.dataset.role;
        skills.textContent = card.dataset.skills;

        modal.style.display = "block";
    });
});

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