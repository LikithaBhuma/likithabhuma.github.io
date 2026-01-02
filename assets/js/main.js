// MOBILE MENU
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
  });

  // Close menu when a link is clicked
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active");
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });
}

// LOAD PROJECTS
fetch("assets/data/projects.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  })
  .then(data => {
    const container = document.querySelector(".projects-grid");
    if (!container) return;

    // Clear existing content instead of appending
    container.innerHTML = "";

    data.forEach(p => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";
      projectCard.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <small>${p.tech.join(", ")}</small>
        <a href="${p.github}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      `;
      container.appendChild(projectCard);
    });
  })
  .catch(error => {
    console.error("Error loading projects:", error);
    const container = document.querySelector(".projects-grid");
    if (container) {
      container.innerHTML = "<p style='color: red;'>Error loading projects. Please try again later.</p>";
    }
  });
