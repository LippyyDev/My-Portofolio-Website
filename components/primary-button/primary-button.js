/**
 * Primary Button Component JavaScript
 * Handles button interactions, animations, and dynamic content
 */

class PrimaryButton {
  constructor() {
    this.init();
  }

  init() {
    this.setupButtonAnimations();
    this.setupClickHandlers();
    this.setupHoverEffects();
    this.setupAccessibility();
  }

  /**
   * Setup button animations and effects
   */
  setupButtonAnimations() {
    // Add ripple effect to buttons
    this.addRippleEffect();

    // Setup shimmer animations
    this.setupShimmerAnimations();

    // Setup glow effects
    this.setupGlowEffects();
  }

  /**
   * Add ripple effect to buttons on click
   */
  addRippleEffect() {
    const buttons = document.querySelectorAll(
      ".btn, .project-link, .contact-link"
    );

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation CSS
    if (!document.querySelector("#ripple-animation")) {
      const style = document.createElement("style");
      style.id = "ripple-animation";
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Setup shimmer animations for buttons
   */
  setupShimmerAnimations() {
    const buttons = document.querySelectorAll(
      ".btn, .project-link, .contact-link"
    );

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.animationPlayState = "running";
      });

      button.addEventListener("mouseleave", () => {
        button.style.animationPlayState = "paused";
      });
    });
  }

  /**
   * Setup enhanced glow effects
   */
  setupGlowEffects() {
    const buttons = document.querySelectorAll(
      ".btn, .project-link, .contact-link"
    );

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.filter = "brightness(1.1)";
      });

      button.addEventListener("mouseleave", () => {
        button.style.filter = "brightness(1)";
      });
    });
  }

  /**
   * Setup click handlers for different button types
   */
  setupClickHandlers() {
    // Handle primary buttons
    const primaryButtons = document.querySelectorAll(".btn-primary");
    primaryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.handlePrimaryClick(e, button);
      });
    });

    // Handle secondary buttons
    const secondaryButtons = document.querySelectorAll(".btn-secondary");
    secondaryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.handleSecondaryClick(e, button);
      });
    });

    // Handle project links
    const projectLinks = document.querySelectorAll(".project-link");
    projectLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleProjectLinkClick(e, link);
      });
    });

    // Handle contact links
    const contactLinks = document.querySelectorAll(".contact-link");
    contactLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleContactLinkClick(e, link);
      });
    });
  }

  /**
   * Handle primary button clicks
   */
  handlePrimaryClick(event, button) {
    // Add any specific primary button logic here
  }

  /**
   * Handle secondary button clicks
   */
  handleSecondaryClick(event, button) {
    // Add any specific secondary button logic here
  }

  /**
   * Handle project link clicks
   */
  handleProjectLinkClick(event, link) {
    // Add any specific project link logic here
  }

  /**
   * Handle contact link clicks
   */
  handleContactLinkClick(event, link) {
    // Add any specific contact link logic here
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    const buttons = document.querySelectorAll(
      ".btn, .project-link, .contact-link"
    );

    buttons.forEach((button) => {
      // Add keyboard navigation support
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });

      // Add focus styles
      button.addEventListener("focus", () => {
        button.style.outline = "2px solid rgba(255, 255, 255, 0.5)";
        button.style.outlineOffset = "2px";
      });

      button.addEventListener("blur", () => {
        button.style.outline = "none";
        button.style.outlineOffset = "0";
      });

      // Ensure buttons have proper ARIA attributes
      if (!button.getAttribute("role")) {
        button.setAttribute("role", "button");
      }

      if (!button.getAttribute("tabindex")) {
        button.setAttribute("tabindex", "0");
      }
    });
  }

  /**
   * Create a new button dynamically
   */
  createButton(options = {}) {
    const {
      type = "primary",
      text = "Button",
      href = "#",
      icon = null,
      className = "",
      onClick = null,
    } = options;

    const button = document.createElement("a");
    button.href = href;
    button.className = `btn btn-${type} ${className}`;
    button.textContent = text;

    if (icon) {
      const iconElement = document.createElement("i");
      iconElement.className = icon;
      button.insertBefore(iconElement, button.firstChild);
    }

    if (onClick) {
      button.addEventListener("click", onClick);
    }

    return button;
  }

  /**
   * Add button to a container
   */
  addButtonToContainer(containerId, buttonOptions) {
    const container = document.getElementById(containerId);
    if (container) {
      const button = this.createButton(buttonOptions);
      container.appendChild(button);
      this.setupButtonAnimations();
    }
  }

  /**
   * Update button text
   */
  updateButtonText(selector, newText) {
    const button = document.querySelector(selector);
    if (button) {
      button.textContent = newText;
    }
  }

  /**
   * Enable/disable button
   */
  toggleButton(selector, disabled = false) {
    const button = document.querySelector(selector);
    if (button) {
      button.style.opacity = disabled ? "0.5" : "1";
      button.style.pointerEvents = disabled ? "none" : "auto";
      button.setAttribute("aria-disabled", disabled);
    }
  }
}

// Initialize the PrimaryButton component when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.primaryButton = new PrimaryButton();
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = PrimaryButton;
}
