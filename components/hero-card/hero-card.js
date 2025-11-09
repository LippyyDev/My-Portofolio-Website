// Hero Card Component JavaScript

class HeroCard {
  constructor() {
    this.card = null;
    this.isHovering = false;
    this.currentIdleAnimation = null; // Track current idle animation
    this.animationChangeTimeout = null; // Track animation change timeout
    this.init();
  }

  init() {
    this.loadCard();
    this.addEventListeners();
  }

  loadCard() {
    // Load the hero card HTML
    fetch("components/hero-card/hero-card.html")
      .then((response) => response.text())
      .then((html) => {
        const heroCardContainer = document.getElementById(
          "hero-card-container"
        );
        if (heroCardContainer) {
          heroCardContainer.innerHTML = html;
          this.card = document.querySelector(".image-card");
          this.setup3DTilt();
          this.triggerFallAnimation();
        }
      })
      .catch((error) => {});
  }

  setup3DTilt() {
    if (!this.card) return;

    this.card.addEventListener("mouseenter", () => {
      this.isHovering = true;
      this.stopIdleAnimation(); // Stop idle animation on hover
      this.activateMicaEffect();
    });

    this.card.addEventListener("mouseleave", () => {
      this.isHovering = false;
      this.resetCard();
      this.deactivateMicaEffect();
      this.resumeIdleAnimation(); // Resume idle animation after hover
    });

    this.card.addEventListener("mousemove", (e) => {
      if (!this.isHovering) return;
      this.handleMouseMove(e);
    });
  }

  triggerFallAnimation() {
    if (!this.card) return;

    // Add fall animation class immediately
    this.card.classList.add("fall-animation");

    // After realistic fall animation completes, add bounce animation
    setTimeout(() => {
      this.card.classList.remove("fall-animation");
      this.card.classList.add("settle-animation");
    }, 1200); // 1.2 seconds for realistic fall animation

    // After bounce animation completes, add final settle animation
    setTimeout(() => {
      this.card.classList.remove("settle-animation");
      this.card.classList.add("final-settle");
    }, 1600); // 1.6 seconds total (1.2s fall + 0.4s bounce)

    // Remove final settle animation class after it completes and start idle floating
    setTimeout(() => {
      this.card.classList.remove("final-settle");
      this.startIdleAnimation();
    }, 1900); // 1.9 seconds total (1.2s fall + 0.4s bounce + 0.3s final settle)
  }

  startIdleAnimation() {
    if (!this.card) return;

    // Randomly choose between different floating animations for variety
    const animations = [
      "idle-floating",
      "gentle-float",
      "subtle-tilt",
      "gentle-sway",
      "soft-drift",
    ];
    const randomAnimation =
      animations[Math.floor(Math.random() * animations.length)];

    // Add the selected animation class
    this.card.classList.add(randomAnimation);

    // Store the current animation type for reference
    this.currentIdleAnimation = randomAnimation;

    // Schedule animation change for variety (every 15-25 seconds)
    this.scheduleAnimationChange();
  }

  scheduleAnimationChange() {
    // Clear any existing timeout
    if (this.animationChangeTimeout) {
      clearTimeout(this.animationChangeTimeout);
    }

    // Schedule next animation change
    const changeDelay = Math.random() * 10000 + 15000; // 15-25 seconds
    this.animationChangeTimeout = setTimeout(() => {
      if (!this.isHovering && this.currentIdleAnimation) {
        this.changeIdleAnimation();
      }
    }, changeDelay);
  }

  changeIdleAnimation() {
    if (!this.card || this.isHovering) return;

    // Remove current animation
    this.stopIdleAnimation();

    // Start new animation after a brief pause
    setTimeout(() => {
      this.startIdleAnimation();
    }, 200);
  }

  stopIdleAnimation() {
    if (!this.card || !this.currentIdleAnimation) return;

    // Clear animation change timeout
    if (this.animationChangeTimeout) {
      clearTimeout(this.animationChangeTimeout);
      this.animationChangeTimeout = null;
    }

    // Remove the current idle animation
    this.card.classList.remove(this.currentIdleAnimation);
    this.currentIdleAnimation = null;
  }

  resumeIdleAnimation() {
    if (!this.card || this.currentIdleAnimation) return;

    // Resume the idle animation after a short delay
    setTimeout(() => {
      this.startIdleAnimation();
    }, 500);
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
    const profileImage = this.card.querySelector(".profile-image");
    const cardOverlay = this.card.querySelector(".card-overlay");
    const cardHeader = this.card.querySelector(".card-header");
    const footerContent = this.card.querySelector(".footer-content");

    // Calculate parallax offsets
    const offsetX = (mouseX / rect.width) * 10;
    const offsetY = (mouseY / rect.height) * 10;

    if (profileImage) {
      profileImage.style.transform = `
        translateX(-50%)
        translateZ(${20 + offsetY * 0.5}px)
        scale(${1.05 + offsetY * 0.001})
      `;
    }

    if (cardOverlay) {
      cardOverlay.style.transform = `
        translateZ(${10 + offsetY * 0.3}px)
        translateX(${offsetX * 0.2}px)
        translateY(${offsetY * 0.2}px)
      `;
    }

    if (cardHeader) {
      cardHeader.style.transform = `
        translateZ(${5 + offsetY * 0.2}px)
        translateY(${-3 + offsetY * 0.1}px)
        translateX(${offsetX * 0.1}px)
      `;
    }

    if (footerContent) {
      footerContent.style.transform = `
        translateZ(${15 + offsetY * 0.4}px)
        translateY(${-5 + offsetY * 0.2}px)
        translateX(${offsetX * 0.15}px)
      `;
    }
  }

  resetCard() {
    this.card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    this.card.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.3)";

    // Reset all parallax elements
    const elements = [
      ".profile-image",
      ".card-overlay",
      ".card-header",
      ".footer-content",
    ];

    elements.forEach((selector) => {
      const element = this.card.querySelector(selector);
      if (element) {
        element.style.transform = "";
      }
    });
  }

  addEventListeners() {
    // Add event listeners for interactive elements
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-primary")) {
        this.handleContactClick();
      }
    });
  }

  handleContactClick() {
    // Handle contact button click
    // You can add scroll to contact section or open modal here
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Method to update card data dynamically
  updateCardData(data) {
    const cardName = document.querySelector(".card-name");
    const cardTitle = document.querySelector(".card-title");
    const statusUsername = document.querySelector(".status-username");

    if (data.name && cardName) cardName.textContent = data.name;
    if (data.title && cardTitle) cardTitle.textContent = data.title;
    if (data.username && statusUsername)
      statusUsername.textContent = data.username;
  }
}

// Initialize hero card when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroCard();
});
