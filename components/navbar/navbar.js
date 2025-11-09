// Navbar functionality
class Navbar {
  constructor() {
    this.loadNavbar();
  }

  async loadNavbar() {
    try {
      const response = await fetch("components/navbar/navbar.html");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const navbarHTML = await response.text();

      const container = document.getElementById("navbar-container");
      if (container) {
        container.innerHTML = navbarHTML;
        // Initialize after navbar is loaded
        setTimeout(() => this.init(), 100);
      } else {
      }
    } catch (error) {
      // Fallback: create navbar directly
      this.createFallbackNavbar();
    }
  }

  createFallbackNavbar() {
    const container = document.getElementById("navbar-container");
    if (container) {
      container.innerHTML = `
        <nav class="navbar" id="navbar">
          <div class="nav-container">
            <div class="nav-logo">
              <h2>Portofolio</h2>
            </div>
            <div class="nav-menu" id="nav-menu">
              <a href="#home" class="nav-link active">Home</a>
              <a href="#about" class="nav-link">About</a>
              <a href="#projects" class="nav-link">Project</a>
              <a href="#contact" class="nav-link">Contact</a>
            </div>
            <div class="nav-toggle" id="nav-toggle">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </div>
          </div>
        </nav>
      `;
      setTimeout(() => this.init(), 100);
    }
  }

  init() {
    this.navToggle = document.getElementById("nav-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveLink();
  }

  setupMobileMenu() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener("click", () => {
        this.navMenu.classList.toggle("active");
        this.navToggle.classList.toggle("active");
      });

      // Close mobile menu when clicking on a link
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.navMenu.classList.remove("active");
          this.navToggle.classList.remove("active");
        });
      });
    }
  }

  setupSmoothScrolling() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  setupActiveLink() {
    // Active navigation link highlighting
    const updateActiveNavLink = () => {
      const sections = document.querySelectorAll("section");
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          this.navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    };

    window.addEventListener("scroll", updateActiveNavLink);
  }
}

// Initialize navbar when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navbar();
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new Navbar();
  });
} else {
  new Navbar();
}
