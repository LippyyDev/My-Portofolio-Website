// About Card Component JavaScript

class AboutCard {
  constructor() {
    this.card = null;
    this.isHovering = false;
    this.init();
  }

  init() {
    this.loadCard();
    this.addEventListeners();
  }

  loadCard() {
    // Load the about card HTML
    fetch("components/about-card/about-card.html")
      .then((response) => response.text())
      .then((html) => {
        const aboutCardContainer = document.getElementById(
          "about-card-container"
        );
        if (aboutCardContainer) {
          aboutCardContainer.innerHTML = html;
          this.card = document.querySelector(".about-image-card");
          this.setup3DTilt();
        }
      })
      .catch((error) => {});
  }

  setup3DTilt() {
    if (!this.card) return;

    this.card.addEventListener("mouseenter", () => {
      this.isHovering = true;
      this.activateMicaEffect();
    });

    this.card.addEventListener("mouseleave", () => {
      this.isHovering = false;
      this.resetCard();
      this.deactivateMicaEffect();
    });

    this.card.addEventListener("mousemove", (e) => {
      if (!this.isHovering) return;
      this.handleMouseMove(e);
    });
  }

  activateMicaEffect() {
    // Add shimmering mica effect class
    this.card.classList.add("mica-active");

    // Enhance the shimmer effect with dynamic intensity
    const shimmerIntensity = Math.random() * 0.3 + 0.7; // Random intensity between 0.7-1.0
    this.card.style.setProperty("--shimmer-intensity", shimmerIntensity);
  }

  deactivateMicaEffect() {
    // Remove shimmering mica effect class
    this.card.classList.remove("mica-active");
  }

  handleMouseMove(e) {
    const rect = this.card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on mouse position
    const rotateX = (mouseY / rect.height) * -20; // Max 20 degrees
    const rotateY = (mouseX / rect.width) * 20; // Max 20 degrees

    // Apply 3D transform
    this.card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;

    // Add enhanced shadow
    this.card.style.boxShadow = `
      0 ${30 + Math.abs(mouseY) * 0.1}px ${
      80 + Math.abs(mouseY) * 0.2
    }px rgba(0, 0, 0, 0.4),
      0 0 ${50 + Math.abs(mouseX) * 0.1}px rgba(255, 255, 255, 0.1)
    `;

    // Parallax effect on inner elements
    this.updateParallaxElements(mouseX, mouseY, rect);
  }

  updateParallaxElements(mouseX, mouseY, rect) {
    const profileImage = this.card.querySelector(".about-profile-image");

    // Calculate parallax offsets
    const offsetX = (mouseX / rect.width) * 10;
    const offsetY = (mouseY / rect.height) * 10;

    if (profileImage) {
      profileImage.style.transform = `
        translateZ(${20 + offsetY * 0.5}px)
        scale(${1.05 + offsetY * 0.001})
      `;
    }
  }

  resetCard() {
    this.card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    this.card.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.3)";

    // Reset all parallax elements
    const elements = [".about-profile-image"];

    elements.forEach((selector) => {
      const element = this.card.querySelector(selector);
      if (element) {
        element.style.transform = "";
      }
    });
  }

  addEventListeners() {
    // Add event listeners for interactive elements if needed
    document.addEventListener("click", (e) => {
      // Add any specific click handlers for about card here
    });
  }

  // Method to update card data dynamically
  updateCardData(data) {
    // No text elements to update anymore
  }
}

// Initialize about card when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AboutCard();
});
