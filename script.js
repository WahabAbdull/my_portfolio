/* ========================================
   PORTFOLIO — Engr. Abdul Wahab
   Interactive Script — Anti-gravity Style
   ======================================== */

// ── DOM Ready ──
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initThemeToggle();
  initNavigation();
  initScrollReveal();
  initSVGScrollAnimate();
  initMobileMenu();
});

// ══════════════════════════════════════════
// ── 1. PARTICLE CANVAS — Mouse-Following ──
// ══════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId;
  let mouse = { x: -9999, y: -9999 };
  const MOUSE_RADIUS = 180;   // attraction range
  const ATTRACT_FORCE = 0.02; // how strongly particles drift toward cursor
  const CONNECT_DIST = 130;
  const MOUSE_CONNECT_DIST = 200;

  canvas.style.pointerEvents = "none";

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Track mouse globally (canvas has pointer-events:none)
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.size = Math.random() * 2.5 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 2 + 1;
      this.hue = Math.random() > 0.5 ? 217 : 142;
    }
    update() {
      // Normal drift
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse attraction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * ATTRACT_FORCE;
        this.x += dx * force;
        this.y += dy * force;
        // Slightly enlarge near cursor
        this.drawSize = this.size + (1 - dist / MOUSE_RADIUS) * 2;
      } else {
        this.drawSize = this.size;
      }

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }
    draw() {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const alpha = isDark ? this.opacity * 0.6 : this.opacity * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.drawSize || this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    // Particle-to-particle connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * (isDark ? 0.15 : 0.08);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(217, 70%, 60%, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Particle-to-mouse connections
      if (mouse.x > 0) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_CONNECT_DIST) {
          const alpha = (1 - dist / MOUSE_CONNECT_DIST) * (isDark ? 0.25 : 0.15);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `hsla(217, 80%, 65%, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => { p.update(); p.draw(); });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
    if (animationId) cancelAnimationFrame(animationId);
    animate();
  }

  window.addEventListener("resize", resize);
  init();
}

// ══════════════════════════════════════════
// ── 2. DARK/LIGHT THEME TOGGLE ──
// ══════════════════════════════════════════
function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  // Load saved theme
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  }

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });
}

// ══════════════════════════════════════════
// ── 3. NAVIGATION — Horizontal Slide ──
// ══════════════════════════════════════════
function initNavigation() {
  const links = document.querySelectorAll(".nav-link");
  const indicator = document.getElementById("navIndicator");
  const navContainer = document.getElementById("navLinks");

  if (!indicator || !navContainer || links.length === 0) return;

  function moveIndicator(link) {
    const rect = link.getBoundingClientRect();
    const containerRect = navContainer.getBoundingClientRect();
    indicator.style.left = rect.left - containerRect.left + "px";
    indicator.style.width = rect.width + "px";
  }

  // Initial position
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    requestAnimationFrame(() => moveIndicator(activeLink));
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      moveIndicator(link);

      const sectionId = link.getAttribute("data-section");
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Update active link on scroll
  const sections = document.querySelectorAll(".section, .hero");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) => {
            const match = l.getAttribute("data-section") === id;
            l.classList.toggle("active", match);
            if (match) moveIndicator(l);
          });

          // Also update mobile menu
          document.querySelectorAll(".mobile-menu a").forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" },
  );

  sections.forEach((s) => observer.observe(s));

  // Recalculate on resize
  window.addEventListener("resize", () => {
    const active = document.querySelector(".nav-link.active");
    if (active) moveIndicator(active);
  });
}

// ══════════════════════════════════════════
// ── 4. SCROLL REVEAL ANIMATIONS ──
// ══════════════════════════════════════════
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

// ══════════════════════════════════════════
// ── 5. SVG PATH SCROLL ANIMATION ──
// ══════════════════════════════════════════
function initSVGScrollAnimate() {
  const paths = document.querySelectorAll(".svg-animated-path.scroll-animate");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.5 },
  );

  paths.forEach((path) => {
    // Calculate actual path length
    if (path.getTotalLength) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    }
    observer.observe(path);
  });
}

// ══════════════════════════════════════════
// ── 6. MOBILE MENU ──
// ══════════════════════════════════════════
function initMobileMenu() {
  const hamburger = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");

  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Close on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

// ══════════════════════════════════════════
// ── 7. PROJECT MODALS ──
// ══════════════════════════════════════════
function openProjectModal(id) {
  const modal = document.getElementById("modal-" + id);
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Close on backdrop click
  modal.addEventListener("click", function handler(e) {
    if (e.target === modal) {
      closeProjectModal(id);
      modal.removeEventListener("click", handler);
    }
  });
}

function closeProjectModal(id) {
  const modal = document.getElementById("modal-" + id);
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ══════════════════════════════════════════
// ── 8. IMAGE LIGHTBOX ──
// ══════════════════════════════════════════
function openLightbox(imgElement) {
  // Prevent modal close when clicking gallery image
  event.stopPropagation();

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = imgElement.src;
  lightboxImg.alt = imgElement.alt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    // Close any open project modal
    document.querySelectorAll(".project-modal.active").forEach((modal) => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});
