// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// GSAP Animations with typing effect
// Home section animations
gsap.from(".quote-bubble", {
  duration: 0.8,
  x: -50,
  opacity: 0,
  ease: "power3.out",
});

// Typing animation for home title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  element.style.opacity = "1"; // Make element visible when typing starts

  // Add cursor element with gradient
  const cursor = document.createElement("span");
  cursor.innerHTML = "|";
  cursor.style.animation = "blink 1s infinite";
  cursor.style.background =
    "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #f093fb)";
  cursor.style.backgroundSize = "400% 400%";
  cursor.style.webkitBackgroundClip = "text";
  cursor.style.webkitTextFillColor = "transparent";
  cursor.style.backgroundClip = "text";
  cursor.style.animation = "blink 1s infinite, gradientShift 3s ease infinite";
  element.appendChild(cursor);

  function type() {
    if (i < text.length) {
      // Remove cursor, add character, add cursor back
      cursor.remove();
      element.innerHTML += text.charAt(i);
      element.appendChild(cursor);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        cursor.remove();
      }, 1000);
    }
  }

  type();
}

// Add blinking cursor animation
const style = document.createElement("style");
style.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);

gsap.from(".home-description", {
  duration: 0.8,
  y: 30,
  opacity: 0,
  delay: 0.4,
  ease: "power3.out",
});

gsap.from(".home-buttons", {
  duration: 0.8,
  y: 30,
  opacity: 0,
  delay: 0.6,
  ease: "power3.out",
});

gsap.from(".profile-card", {
  duration: 0.8,
  x: 50,
  opacity: 0,
  delay: 0.3,
  ease: "power3.out",
});

// Scroll-triggered animations
gsap.utils.toArray(".skill-card").forEach((card, index) => {
  gsap.from(card, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    delay: index * 0.1,
  });
});

gsap.utils.toArray(".achievement-card").forEach((card, index) => {
  gsap.from(card, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    delay: index * 0.1,
  });
});

gsap.utils.toArray(".project-card").forEach((card, index) => {
  gsap.from(card, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    delay: index * 0.1,
  });
});

// Section title animations
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.from(title, {
    duration: 1,
    y: 30,
    opacity: 0,
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
});

// About section animations - Enhanced scroll animations
// About main box entrance animation
gsap.from(".about-main-box", {
  duration: 1.2,
  y: 80,
  opacity: 0,
  scale: 0.95,
  scrollTrigger: {
    trigger: ".about-main-box",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  ease: "power3.out",
});

// About title animation with typewriter effect
gsap.from(".about-title", {
  duration: 1,
  y: 40,
  opacity: 0,
  scrollTrigger: {
    trigger: ".about-title",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  ease: "power3.out",
});

// About description animation with staggered effect
gsap.from(".about-description", {
  duration: 1.2,
  y: 30,
  opacity: 0,
  scrollTrigger: {
    trigger: ".about-description",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  delay: 0.3,
  ease: "power3.out",
});

// Counter animation for statistics
function animateCounter(element, targetValue, duration = 2) {
  const startValue = 0;
  const increment = targetValue / (duration * 60); // 60fps
  let currentValue = startValue;

  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(timer);
    }

    if (targetValue === 3.95) {
      element.textContent = currentValue.toFixed(2);
    } else {
      element.textContent = Math.floor(currentValue) + "+";
    }
  }, 1000 / 60);
}

// Statistics counter animation - Simplified and working version
gsap.utils.toArray(".stat-item").forEach((statItem, index) => {
  const statNumber = statItem.querySelector(".stat-number");
  const statLabel = statItem.querySelector(".stat-label");

  // Store original values
  const originalText = statNumber.textContent;
  let targetValue = 0;

  // Set initial values
  if (originalText.includes("20+")) {
    statNumber.textContent = "0+";
    targetValue = 20;
  } else if (originalText.includes("3+")) {
    statNumber.textContent = "0+";
    targetValue = 3;
  } else if (originalText.includes("3.95")) {
    const gpaSpan = statNumber.querySelector(".stat-gpa");
    if (gpaSpan) {
      gpaSpan.textContent = "0.00";
      targetValue = 3.95;
    }
  }

  // Animate stat item entrance
  gsap.from(statItem, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    scale: 0.8,
    scrollTrigger: {
      trigger: statItem,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    delay: 0.5 + index * 0.2,
    ease: "back.out(1.7)",
    onComplete: () => {
      // Start counter animation after entrance
      setTimeout(() => {
        if (targetValue === 3.95) {
          const gpaSpan = statNumber.querySelector(".stat-gpa");
          if (gpaSpan) {
            animateCounter(gpaSpan, 3.95);
          }
        } else {
          animateCounter(statNumber, targetValue);
        }
      }, 200); // Small delay to ensure visibility
    },
  });

  // Animate label separately
  gsap.from(statLabel, {
    duration: 0.6,
    y: 20,
    opacity: 0,
    scrollTrigger: {
      trigger: statItem,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    delay: 0.7 + index * 0.2,
    ease: "power3.out",
  });
});

// Enhanced hanging card animation with rotation and scale
gsap.from(".hanging-card", {
  duration: 1.2,
  x: 80,
  y: 30,
  opacity: 0,
  scale: 0.8,
  rotation: 15,
  scrollTrigger: {
    trigger: ".hanging-card",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  ease: "back.out(1.7)",
});

// Animate card lanyard separately
gsap.from(".card-lanyard", {
  duration: 0.8,
  scaleY: 0,
  transformOrigin: "top",
  scrollTrigger: {
    trigger: ".hanging-card",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  delay: 0.3,
  ease: "power3.out",
});

// Animate card body with delay
gsap.from(".card-body", {
  duration: 1,
  y: 50,
  opacity: 0,
  scale: 0.9,
  scrollTrigger: {
    trigger: ".hanging-card",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  delay: 0.5,
  ease: "power3.out",
});

// Hanging card interaction
const hangingCard = document.getElementById("hangingCard");
let isPressed = false;
let pressTimer = null;
let animationId = null;

if (hangingCard) {
  // Mouse events
  hangingCard.addEventListener("mousedown", startPress);
  hangingCard.addEventListener("mouseup", endPress);
  hangingCard.addEventListener("mouseleave", endPress);

  // Touch events for mobile
  hangingCard.addEventListener("touchstart", startPress);
  hangingCard.addEventListener("touchend", endPress);
  hangingCard.addEventListener("touchcancel", endPress);

  function startPress(e) {
    e.preventDefault();
    isPressed = true;

    // Add pressed class for visual feedback
    hangingCard.classList.add("card-pressed");

    // Start pulsing animation
    startPulseAnimation();

    // Set timer for long press effect
    pressTimer = setTimeout(() => {
      if (isPressed) {
        triggerLongPressEffect();
      }
    }, 1000); // 1 second for long press
  }

  function endPress(e) {
    e.preventDefault();
    isPressed = false;

    // Remove pressed class
    hangingCard.classList.remove("card-pressed");

    // Stop pulsing animation
    stopPulseAnimation();

    // Clear timer
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  }

  function startPulseAnimation() {
    const cardBody = hangingCard.querySelector(".card-body");
    let scale = 1;
    let direction = 1;

    function pulse() {
      scale += direction * 0.02;
      if (scale >= 1.1) {
        direction = -1;
      } else if (scale <= 0.95) {
        direction = 1;
      }

      cardBody.style.transform = `translateY(-5px) scale(${scale})`;

      if (isPressed) {
        animationId = requestAnimationFrame(pulse);
      }
    }

    pulse();
  }

  function stopPulseAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    // Reset transform
    const cardBody = hangingCard.querySelector(".card-body");
    cardBody.style.transform = "";
  }

  function triggerLongPressEffect() {
    // Create ripple effect
    const ripple = document.createElement("div");
    ripple.className = "card-ripple";
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
    `;

    hangingCard.appendChild(ripple);

    // Animate ripple
    gsap.to(ripple, {
      width: "200px",
      height: "200px",
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        ripple.remove();
      },
    });

    // Shake animation
    gsap.to(hangingCard, {
      x: -10,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(hangingCard, { x: 0 });
      },
    });

    // Change card labels temporarily
    const labels = hangingCard.querySelectorAll(".card-label");
    labels.forEach((label, index) => {
      const originalText = label.textContent;
      const newTexts = ["Creative", "Innovative", "Passionate", "Dedicated"];

      label.textContent = newTexts[index] || originalText;
      label.style.background = "linear-gradient(135deg, #f59e0b, #ef4444)";

      setTimeout(() => {
        label.textContent = originalText;
        label.style.background = "";
      }, 2000);
    });
  }
}

// Navbar background change on scroll
ScrollTrigger.create({
  start: "top -80",
  end: 99999,
  toggleClass: { className: "scrolled", targets: ".navbar" },
});

// Marquee text skew effect on scroll
ScrollTrigger.create({
  trigger: ".marquee-section",
  start: "top bottom",
  end: "bottom top",
  scrub: 0.5,
  onUpdate: (self) => {
    const progress = self.progress;
    const skewAmount = (progress - 0.5) * 80; // Skew dari -40 sampai 40 derajat

    gsap.to(".marquee-text", {
      skewX: skewAmount,
      duration: 0.05,
      ease: "none",
    });
  },
});

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const homeTitle = document.querySelector(".home-title");
  if (homeTitle) {
    const originalText = homeTitle.textContent;
    // Start typing animation immediately without delay
    typeWriter(homeTitle, originalText, 120);
  }
});

// Quote typing animation - faster typing speed
function animateQuote() {
  const quoteElement = document.querySelector(".about-motto");
  if (quoteElement) {
    const originalText = quoteElement.textContent;
    quoteElement.textContent = "";
    quoteElement.style.opacity = "1";

    // Add cursor element
    const cursor = document.createElement("span");
    cursor.innerHTML = "|";
    cursor.style.animation = "blink 1s infinite";
    cursor.style.color = "#8b5cf6";
    quoteElement.appendChild(cursor);

    let i = 0;
    function type() {
      if (i < originalText.length) {
        cursor.remove();
        quoteElement.textContent += originalText.charAt(i);
        quoteElement.appendChild(cursor);
        i++;
        setTimeout(type, 50); // Faster typing speed (was 80ms)
      } else {
        setTimeout(() => {
          cursor.remove();
        }, 500); // Shorter cursor display time (was 1000ms)
      }
    }

    type();
  }
}

// About divider - no animation (static)

// Enhanced motto animation with typing effect - sync with counter animation
gsap.from(".about-motto", {
  duration: 0.5,
  y: 20,
  opacity: 0,
  scrollTrigger: {
    trigger: ".about-motto",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  delay: 0.7, // Sync with counter animation timing
  ease: "power3.out",
  onComplete: () => {
    animateQuote();
  },
});

// Additional About Me animations
// Parallax effect for about section background
ScrollTrigger.create({
  trigger: ".about",
  start: "top bottom",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;
    const parallaxOffset = (progress - 0.5) * 50;

    gsap.to(".about-main-box", {
      y: parallaxOffset,
      duration: 0.1,
      ease: "none",
    });
  },
});

// Staggered animation for about section elements (excluding stats and divider to avoid conflict)
const aboutElements = [
  ".about-title",
  ".about-description",
  ".about-right-section",
  ".about-motto",
];

aboutElements.forEach((element, index) => {
  gsap.from(element, {
    duration: 0.8,
    y: 40,
    opacity: 0,
    scrollTrigger: {
      trigger: ".about-main-box",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    delay: index * 0.15,
    ease: "power3.out",
  });
});

// Enhanced hover effects for about section
const aboutMainBox = document.querySelector(".about-main-box");
if (aboutMainBox) {
  let isHovering = false;
  let animationId = null;

  aboutMainBox.addEventListener("mouseenter", () => {
    isHovering = true;

    // Only keep cursor light effect, no text animations
  });

  aboutMainBox.addEventListener("mouseleave", () => {
    isHovering = false;

    // Reset light position when leaving
    aboutMainBox.style.setProperty("--mouse-x", "50%");
    aboutMainBox.style.setProperty("--mouse-y", "50%");
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });

  aboutMainBox.addEventListener("mousemove", (e) => {
    if (isHovering) {
      // Cancel previous animation frame if exists
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      // Use requestAnimationFrame for smooth real-time updates
      animationId = requestAnimationFrame(() => {
        const rect = aboutMainBox.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        aboutMainBox.style.setProperty("--mouse-x", `${x}%`);
        aboutMainBox.style.setProperty("--mouse-y", `${y}%`);
      });
    }
  });
}

// Simple scroll to top functionality
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Tools animation control - triggered when section comes into view
let toolsAnimationTriggered = false;

function triggerToolsAnimation() {
  if (toolsAnimationTriggered) return;

  toolsAnimationTriggered = true;

  // Add animate class to header first
  const toolsHeader = document.querySelector(".tools-header");
  if (toolsHeader) {
    toolsHeader.classList.add("animate");
  }

  // Add animate class to scroll containers with delay
  setTimeout(() => {
    const toolsScroll = document.querySelector(".tools-scroll");
    if (toolsScroll) {
      toolsScroll.classList.add("animate");
    }

    const toolsScroll2 = document.querySelector(".tools-scroll-2");
    if (toolsScroll2) {
      toolsScroll2.classList.add("animate");
    }
  }, 200);

  // Add animate class to all tool cards with staggered delay
  const toolCards = document.querySelectorAll(".tool-card");
  toolCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("animate");
    }, 100 + index * 50); // Start at 0.1s, then every 0.05s
  });

  // Start scroll animation after all cards are animated
  setTimeout(() => {
    const scrollElements = document.querySelectorAll(
      ".tools-scroll, .tools-scroll-2"
    );
    scrollElements.forEach((element) => {
      element.style.animationPlayState = "running";
    });
  }, 2000); // Wait 2 seconds for all card animations to complete
}

// ScrollTrigger for tools section
ScrollTrigger.create({
  trigger: ".tools",
  start: "top 80%",
  onEnter: () => {
    triggerToolsAnimation();
  },
  once: true, // Only trigger once
});

// Tools animations are now handled by the triggerToolsAnimation function above

// Certificate animation control - triggered when section comes into view
let certificateAnimationTriggered = false;

function triggerCertificateAnimation() {
  // Add animate class to all certificate cards with staggered delay
  const certificateCards = document.querySelectorAll(".certificate-card");
  certificateCards.forEach((card, index) => {
    // Only animate if card doesn't already have the animate class
    if (!card.classList.contains("animate")) {
      setTimeout(() => {
        card.classList.add("animate");
        card.classList.add("floating");
      }, 100 + index * 100); // Start at 0.1s, then every 0.1s
    }
  });
}

// ScrollTrigger for certificates section
ScrollTrigger.create({
  trigger: ".certificates",
  start: "top 80%",
  onEnter: () => {
    if (!certificateAnimationTriggered) {
      certificateAnimationTriggered = true;
      triggerCertificateAnimation();
    }
  },
  onEnterBack: () => {
    // Also trigger when scrolling back to section
    triggerCertificateAnimation();
  },
  once: false, // Allow multiple triggers for pagination
});

// Project Cards Animation Control
document.addEventListener("DOMContentLoaded", function () {
  const projectsScroll = document.querySelector(".projects-scroll");
  const projectCards = document.querySelectorAll(".project-card-container");

  if (projectsScroll && projectCards.length > 0) {
    // Detect if device has hover capability (desktop)
    const hasHoverCapability = window.matchMedia("(hover: hover)").matches;

    // Add hover event listeners to each project card - ONLY for desktop
    if (hasHoverCapability) {
      projectCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          // Pause animation smoothly
          projectsScroll.style.animationPlayState = "paused";
          projectsScroll.style.transition = "animation-play-state 0.3s ease";
        });

        card.addEventListener("mouseleave", function () {
          // Resume animation smoothly
          projectsScroll.style.animationPlayState = "running";
          projectsScroll.style.transition = "animation-play-state 0.3s ease";
        });
      });

      // Also add hover to the entire scroll container - ONLY for desktop
      projectsScroll.addEventListener("mouseenter", function () {
        this.style.animationPlayState = "paused";
        this.style.transition = "animation-play-state 0.3s ease";
      });

      projectsScroll.addEventListener("mouseleave", function () {
        this.style.animationPlayState = "running";
        this.style.transition = "animation-play-state 0.3s ease";
      });
    }

    // Add click/touch event listener for ALL devices - pause on click only
    projectCards.forEach((card) => {
      let isPaused = false;
      let clickTimeout;

      card.addEventListener("click", function (e) {
        // Clear any existing timeout
        clearTimeout(clickTimeout);

        if (!isPaused) {
          // Pause animation on click
          projectsScroll.style.animationPlayState = "paused";
          isPaused = true;

          // Resume after 3 seconds
          clickTimeout = setTimeout(() => {
            projectsScroll.style.animationPlayState = "running";
            isPaused = false;
          }, 3000);
        }
      });
    });
  }
});

// Contact Form Button Animation with Internal Progress Bar
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const buttonProgress = document.getElementById("button-progress");
  const buttonText = document.querySelector(".button-text");

  if (contactForm && submitBtn && buttonProgress && buttonText) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Validate form
      if (!name || !email || !message) {
        alert("Mohon isi semua field!");
        return;
      }

      // Start progress animation
      startProgressAnimation();

      // Simulate form submission with progress
      simulateFormSubmission();
    });
  }

  function startProgressAnimation() {
    const submitBtn = document.getElementById("submit-btn");
    const buttonProgress = document.getElementById("button-progress");
    const buttonText = document.querySelector(".button-text");
    const buttonIcon = submitBtn.querySelector("i");

    // Store original content
    if (!submitBtn.dataset.originalContent) {
      submitBtn.dataset.originalContent = submitBtn.innerHTML;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.style.cursor = "not-allowed";

    // Start progress animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12; // Random increment for realistic effect

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Update button content when complete
        buttonText.textContent = "Pesan Terkirim!";
        buttonIcon.className = "fas fa-check";

        // Show success state
        setTimeout(() => {
          showSuccessState();
        }, 500);
      } else {
        // Update progress bar width
        buttonProgress.style.width = progress + "%";

        // Update text based on progress
        if (progress < 25) {
          buttonText.textContent = "Mengirim...";
        } else if (progress < 50) {
          buttonText.textContent = "Memproses...";
        } else if (progress < 75) {
          buttonText.textContent = "Menyelesaikan...";
        } else {
          buttonText.textContent = "Hampir selesai...";
        }
      }
    }, 150); // Update every 150ms
  }

  function simulateFormSubmission() {
    // Simulate actual form submission to FormSubmit.co
    const formData = new FormData(document.getElementById("contact-form"));

    // Create a hidden iframe for form submission
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.name = "hidden_iframe";
    document.body.appendChild(iframe);

    // Set form target to iframe
    const form = document.getElementById("contact-form");
    form.target = "hidden_iframe";

    // Submit form after progress animation starts
    setTimeout(() => {
      form.submit();
    }, 1000);

    // Clean up iframe after submission
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 5000);
  }

  function showSuccessState() {
    const submitBtn = document.getElementById("submit-btn");
    const buttonProgress = document.getElementById("button-progress");

    // Keep original purple background, don't change to green
    // The green progress bar inside will show completion

    // Reset after 4 seconds to give user time to see "Pesan Terkirim!" status
    setTimeout(() => {
      resetButtonState();
      resetForm();
    }, 4000); // Increased from 2000ms to 4000ms (4 seconds)
  }

  function resetButtonState() {
    const submitBtn = document.getElementById("submit-btn");
    const buttonProgress = document.getElementById("button-progress");
    const buttonText = document.querySelector(".button-text");

    // Reset button
    submitBtn.innerHTML = submitBtn.dataset.originalContent;
    submitBtn.style.background =
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    submitBtn.style.cursor = "pointer";
    submitBtn.disabled = false;

    // Reset progress bar
    buttonProgress.style.width = "0%";
  }

  function resetForm() {
    const contactForm = document.getElementById("contact-form");
    contactForm.reset();
  }
});

// Floating Navigation Active State
document.addEventListener("DOMContentLoaded", function () {
  const navIcons = document.querySelectorAll(".nav-icon");
  const sections = document.querySelectorAll("section[id]");

  // Function to update active nav icon based on scroll position
  function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 200;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navIcons.forEach((icon) => {
          const href = icon.getAttribute("href");
          if (href && href.includes(`#${sectionId}`)) {
            icon.classList.add("active");
          } else if (!href || !href.startsWith("http")) {
            icon.classList.remove("active");
          }
        });
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav);

  // Update active nav on click
  navIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const href = this.getAttribute("href");

      // Only handle internal links
      if (href && href.startsWith("#")) {
        navIcons.forEach((i) => i.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Set initial active state
  updateActiveNav();
});

// Theme Toggle Functionality - Removed (theme toggle button has been removed from UI)

// Music Player Functionality
document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const musicPopup = document.getElementById("music-popup");
  const musicPopupText = document.getElementById("music-popup-text");

  // Playlist
  const playlist = [
    {
      src: "assets/songs/Interstellar Main Theme.mp3",
      title: "Interstellar Main Theme",
    },
    {
      src: "assets/songs/Memory Reboot.mp3",
      title: "Memory Reboot",
    },
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  // Load track
  function loadTrack(index) {
    currentTrackIndex = index;
    audioPlayer.src = playlist[index].src;
    audioPlayer.load();
  }

  // Show popup notification
  function showMusicPopup(title) {
    musicPopupText.textContent = `${title} - Now Playing`;
    musicPopup.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
      musicPopup.classList.remove("show");
    }, 3000);
  }

  // Play track
  function playTrack() {
    audioPlayer
      .play()
      .then(() => {
        isPlaying = true;
        playPauseBtn.querySelector("i").classList.remove("fa-play");
        playPauseBtn.querySelector("i").classList.add("fa-pause");
        showMusicPopup(playlist[currentTrackIndex].title);
      })
      .catch((error) => {
        console.log("Autoplay was prevented:", error);
        // Jika autoplay gagal, user perlu klik manual
      });
  }

  // Pause track
  function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.querySelector("i").classList.remove("fa-pause");
    playPauseBtn.querySelector("i").classList.add("fa-play");
  }

  // Play/Pause toggle - Support both click and touch events for mobile
  function togglePlayPause() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  playPauseBtn.addEventListener("click", togglePlayPause);
  playPauseBtn.addEventListener("touchend", function (e) {
    e.preventDefault();
    togglePlayPause();
  });

  // Previous track - Support both click and touch events for mobile
  function goToPreviousTrack() {
    currentTrackIndex =
      currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      playTrack();
    }
  }

  prevBtn.addEventListener("click", goToPreviousTrack);
  prevBtn.addEventListener("touchend", function (e) {
    e.preventDefault();
    goToPreviousTrack();
  });

  // Next track - Support both click and touch events for mobile
  function goToNextTrack() {
    currentTrackIndex =
      currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      playTrack();
    }
  }

  nextBtn.addEventListener("click", goToNextTrack);
  nextBtn.addEventListener("touchend", function (e) {
    e.preventDefault();
    goToNextTrack();
  });

  // Auto play next track when current ends
  audioPlayer.addEventListener("ended", function () {
    currentTrackIndex =
      currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1;
    loadTrack(currentTrackIndex);
    playTrack();
  });

  // Initialize - Load first track and try to autoplay
  loadTrack(0);

  // Autoplay setelah user interaction pertama (karena browser modern memblokir autoplay)
  // Kita akan coba autoplay setelah sedikit delay
  setTimeout(() => {
    playTrack();
  }, 1000);

  // Backup: jika autoplay gagal, coba lagi saat user klik pertama kali
  let hasUserInteracted = false;
  document.body.addEventListener(
    "click",
    function () {
      if (!hasUserInteracted && !isPlaying) {
        hasUserInteracted = true;
        playTrack();
      }
    },
    { once: true }
  );
});
