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
      projectCard.className = "col";
      projectCard.innerHTML = `
        <div class="card h-100 border-0 shadow-sm">
          <img src="${p.image}" class="card-img-top" alt="${p.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text text-muted">${p.description}</p>
            <div class="mt-auto">
              <p class="mb-2 text-info fw-semibold">${p.tech.join(", ")}</p>
              <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="stretched-link text-decoration-none">View on GitHub →</a>
            </div>
          </div>
        </div>
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

function initGalleryModal() {
  const galleryImages = document.querySelectorAll(".graduation-gallery img");
  const overlay = document.getElementById("image-modal-overlay");
  const modalImg = document.getElementById("image-modal-img");
  const caption = document.getElementById("image-modal-caption");
  const closeButton = document.getElementById("image-modal-close");

  if (!galleryImages.length || !overlay || !modalImg || !caption || !closeButton) {
    return;
  }

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt || "Graduation photo";
      caption.textContent = img.nextElementSibling?.textContent?.trim() || img.alt || "Graduation photo";
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
    });
  });

  const closeModal = () => {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
  };

  closeButton.addEventListener("click", closeModal);

  overlay.addEventListener("click", event => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}

initGalleryModal();

function initSkillToggles() {
  const skillGrid = document.querySelector('.technical-skills-grid');
  if (!skillGrid) return;

  const cards = skillGrid.querySelectorAll('.card');
  cards.forEach(card => {
    // find a list either inside .card-body or directly under .card
    let list = card.querySelector('.card-body ul');
    if (!list) list = card.querySelector('ul');
    if (!list) return;

    const items = Array.from(list.querySelectorAll('li'));
    if (items.length <= 3) return;

    // hide items after the first 3
    items.forEach((li, idx) => {
      if (idx >= 3) li.classList.add('collapsed-skill');
    });

    // add fade overlay
    const fade = document.createElement('div');
    fade.className = 'fade-bottom';
    card.appendChild(fade);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'more-toggle';
    btn.textContent = 'More';
    btn.setAttribute('aria-expanded', 'false');
    card.appendChild(btn);

    btn.addEventListener('click', () => {
      const expanded = card.classList.toggle('expanded');
      btn.textContent = expanded ? 'Less' : 'More';
      btn.setAttribute('aria-expanded', String(expanded));
      // toggle visibility of collapsed items
      items.forEach((li, idx) => {
        if (idx >= 3) li.classList.toggle('collapsed-skill');
      });
      // if expanded, scroll the card into view for better UX
      if (expanded) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

// initialize skill toggles after DOMContent and window load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillToggles);
} else {
  initSkillToggles();
}
