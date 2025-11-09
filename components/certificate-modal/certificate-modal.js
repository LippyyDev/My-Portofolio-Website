// Certificate Modal JavaScript
class CertificateModal {
  constructor() {
    this.modal = null;
    this.modalOverlay = null;
    this.modalClose = null;
    this.modalTitle = null;
    this.mainImage = null;
    this.thumbnailsContainer = null;
    this.currentImageSpan = null;
    this.totalImagesSpan = null;
    this.certificateName = null;
    this.certificateIssuer = null;
    this.certificateDescription = null;
    this.prevBtn = null;
    this.nextBtn = null;

    this.currentImageIndex = 0;
    this.currentCertificate = null;

    this.init();
  }

  async init() {
    await this.loadModalHTML();
    this.setupEventListeners();
    this.setupCertificateCards();
  }

  async loadModalHTML() {
    try {
      const response = await fetch(
        "components/certificate-modal/certificate-modal.html"
      );
      const html = await response.text();
      const container = document.getElementById("certificate-modal-container");
      container.innerHTML = html;

      // Initialize DOM elements after HTML is loaded
      this.modal = document.getElementById("certificate-modal");
      this.modalOverlay = document.querySelector(".modal-overlay");
      this.modalClose = document.getElementById("modal-close");
      this.modalTitle = document.getElementById("modal-title");
      this.mainImage = document.getElementById("main-image");
      this.thumbnailsContainer = document.getElementById("thumbnails");
      this.currentImageSpan = document.getElementById("current-image");
      this.totalImagesSpan = document.getElementById("total-images");
      this.certificateName = document.getElementById("certificate-name");
      this.certificateIssuer = document.getElementById("certificate-issuer");
      this.certificateDescription = document.getElementById(
        "certificate-description"
      );
      this.prevBtn = document.getElementById("prev-btn");
      this.nextBtn = document.getElementById("next-btn");
    } catch (error) {
      console.error("Error loading certificate modal HTML:", error);
    }
  }

  setupEventListeners() {
    // Use event delegation for navigation buttons
    // Wait a bit to ensure modal HTML is fully loaded
    setTimeout(() => {
      const modalNavigation = document.querySelector(".modal-navigation");
      if (modalNavigation) {
        // Event delegation for prev/next buttons on navigation container
        modalNavigation.addEventListener("click", (e) => {
          const target = e.target.closest("#prev-btn, #next-btn, .prev-btn, .next-btn");
          if (target) {
            e.preventDefault();
            e.stopPropagation();
            if (target.id === "prev-btn" || target.classList.contains("prev-btn")) {
              this.previousImage();
            } else if (target.id === "next-btn" || target.classList.contains("next-btn")) {
              this.nextImage();
            }
          }
        });

        // Touch events for mobile
        modalNavigation.addEventListener("touchend", (e) => {
          const target = e.target.closest("#prev-btn, #next-btn, .prev-btn, .next-btn");
          if (target) {
            e.preventDefault();
            e.stopPropagation();
            if (target.id === "prev-btn" || target.classList.contains("prev-btn")) {
              this.previousImage();
            } else if (target.id === "next-btn" || target.classList.contains("next-btn")) {
              this.nextImage();
            }
          }
        });
      }

      // Also setup direct event listeners as fallback
      this.prevBtn = document.getElementById("prev-btn");
      this.nextBtn = document.getElementById("next-btn");

      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.previousImage();
        });
        this.prevBtn.addEventListener("touchend", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.previousImage();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.nextImage();
        });
        this.nextBtn.addEventListener("touchend", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.nextImage();
        });
      }
    }, 200);

    // Setup close button and overlay
    if (this.modalClose) {
      this.modalClose.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
      });
      this.modalClose.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
      });
    }
    
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener("click", () => this.closeModal());
      this.modalOverlay.addEventListener("touchend", () => this.closeModal());
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (this.modal && this.modal.classList.contains("active")) {
        if (e.key === "Escape") this.closeModal();
        if (e.key === "ArrowLeft") this.previousImage();
        if (e.key === "ArrowRight") this.nextImage();
      }
    });
  }

  setupCertificateCards() {
    // Certificate cards are now dynamically generated by pagination
    // We'll set up event listeners when cards are created
    this.setupDynamicCertificateCards();
  }

  setupDynamicCertificateCards() {
    // This method will be called by pagination when cards are created
    const certificateCards = document.querySelectorAll(".certificate-card");
    certificateCards.forEach((card, index) => {
      // Remove existing listeners to avoid duplicates
      card.removeEventListener("click", this.handleCardClick);
      // Add new listener
      card.addEventListener("click", this.handleCardClick.bind(this));
    });
  }

  handleCardClick(event) {
    const card = event.currentTarget;
    const certificateIndex = parseInt(
      card.getAttribute("data-certificate-index")
    );
    this.openModal(certificateIndex);
  }

  // Certificate data dengan foto-foto terkait
  getCertificateData() {
    return [
      {
        id: 1,
        name: "Web Development & UI UX Design",
        issuer: "Celerates School",
        description:
          "Sertifikat pelatihan komprehensif dalam pengembangan web dan desain UI/UX yang mencakup HTML, CSS, JavaScript, dan prinsip-prinsip desain user experience.",
        images: [
          "assets/img/certificate/Sertifikat1.jpg",
          "assets/img/certificate/Sertifikat1a.jpg",
          "assets/img/certificate/Sertifikat1b.jpg",
          "assets/img/certificate/Sertifikat1c.jpg",
        ],
      },
      {
        id: 2,
        name: "Belajar Dasar Manajemen Proyek",
        issuer: "Dicoding Indonesia",
        description:
          "Sertifikat pembelajaran dasar-dasar manajemen proyek yang mencakup perencanaan, eksekusi, monitoring, dan kontrol proyek.",
        images: ["assets/img/certificate/Sertifikat2.jpg"],
      },
      {
        id: 3,
        name: "Website Development With Wordpress",
        issuer: "MySkill",
        description:
          "Sertifikat pengembangan website menggunakan WordPress yang mencakup instalasi, konfigurasi, customisasi, dan optimasi.",
        images: [
          "assets/img/certificate/Sertifikat3.jpg",
          "assets/img/certificate/Sertifikat3a.jpg",
        ],
      },
      {
        id: 4,
        name: "Fundamental Front-End Web Development II",
        issuer: "Coding Studio",
        description:
          "Sertifikat pembelajaran fundamental pengembangan front-end web yang mencakup HTML5, CSS3, JavaScript ES6, dan framework modern.",
        images: ["assets/img/certificate/Sertifikat4.jpg"],
      },
      {
        id: 5,
        name: "Fundamental Front-End Web Development 2021",
        issuer: "Coding Studio",
        description:
          "Sertifikat pembelajaran fundamental pengembangan front-end web tahun 2021 yang mencakup teknologi web terbaru dan best practices.",
        images: ["assets/img/certificate/Sertifikat5.webp"],
      },
      {
        id: 6,
        name: "Microsoft Excel - Beginner to Advance with Example",
        issuer: "Udemy",
        description:
          "Sertifikat pembelajaran Microsoft Excel dari tingkat pemula hingga mahir dengan berbagai contoh praktis dan studi kasus.",
        images: ["assets/img/certificate/Sertifikat6.jpg"],
      },
      {
        id: 7,
        name: "HTML5 CSS3 Javascript Bootstrap & JQuery Masterclass 5 in 1",
        issuer: "Udemy",
        description:
          "Sertifikat masterclass komprehensif yang mencakup HTML5, CSS3, JavaScript, Bootstrap, dan jQuery dalam satu paket pembelajaran.",
        images: ["assets/img/certificate/Sertifikat7.jpg"],
      },
      {
        id: 8,
        name: "AI Engineer Explorer",
        issuer: "Udemy",
        description:
          "Sertifikat eksplorasi dalam bidang AI Engineering yang mencakup machine learning, deep learning, dan penerapan AI dalam berbagai domain.",
        images: ["assets/img/certificate/Sertifikat8.jpg"],
      },
      {
        id: 9,
        name: "Sertifikat Magang Industri",
        issuer: "Pengadilan Tinggi Agama Makassar",
        description:
          "Sertifikat magang industri di Pengadilan Tinggi Agama Makassar yang mencakup pengalaman kerja praktis dalam sistem informasi peradilan.",
        images: ["assets/img/certificate/Sertifikat9.jpg"],
      },
    ];
  }

  openModal(certificateIndex) {
    if (!this.modal) {
      return;
    }

    const certificateData = this.getCertificateData();
    this.currentCertificate = certificateData[certificateIndex];
    this.currentImageIndex = 0;

    // Re-initialize button references to ensure they exist
    this.prevBtn = document.getElementById("prev-btn");
    this.nextBtn = document.getElementById("next-btn");

    this.renderThumbnails(); // Render thumbnails once when opening modal
    this.updateModalContent(); // Update all other content
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    if (!this.modal) return;

    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  updateModalContent() {
    if (!this.currentCertificate) return;

    // Update modal title and certificate info
    this.modalTitle.textContent = this.currentCertificate.name;
    this.certificateName.textContent = this.currentCertificate.name;
    this.certificateIssuer.textContent = this.currentCertificate.issuer;
    this.certificateDescription.textContent =
      this.currentCertificate.description;

    // Update main image
    this.mainImage.src = this.currentCertificate.images[this.currentImageIndex];
    this.mainImage.alt = this.currentCertificate.name;

    // Highlight active thumbnail (don't re-render)
    this.highlightActiveThumbnail();

    // Update image counter
    this.updateImageCounter();

    // Update navigation buttons
    this.updateNavigationButtons();
  }

  renderThumbnails() {
    this.thumbnailsContainer.innerHTML = "";

    this.currentCertificate.images.forEach((imageSrc, index) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = "thumbnail";

      const img = document.createElement("img");
      img.src = imageSrc;
      img.alt = `${this.currentCertificate.name} - Image ${index + 1}`;

      thumbnail.appendChild(img);
      thumbnail.addEventListener("click", () => this.selectImage(index));

      this.thumbnailsContainer.appendChild(thumbnail);
    });
  }

  highlightActiveThumbnail() {
    const thumbnails = this.thumbnailsContainer.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumbnail, index) => {
      if (index === this.currentImageIndex) {
        thumbnail.classList.add("active");
      } else {
        thumbnail.classList.remove("active");
      }
    });
  }

  updateImageCounter() {
    this.currentImageSpan.textContent = this.currentImageIndex + 1;
    this.totalImagesSpan.textContent = this.currentCertificate.images.length;
  }

  updateNavigationButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentImageIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled =
        this.currentImageIndex === this.currentCertificate.images.length - 1;
    }
  }

  selectImage(index) {
    this.currentImageIndex = index;
    this.mainImage.src = this.currentCertificate.images[index];
    this.highlightActiveThumbnail();
    this.updateImageCounter();
    this.updateNavigationButtons();
  }

  previousImage() {
    if (!this.currentCertificate || !this.currentCertificate.images) {
      return;
    }
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.selectImage(this.currentImageIndex);
    }
  }

  nextImage() {
    if (!this.currentCertificate || !this.currentCertificate.images) {
      return;
    }
    if (this.currentImageIndex < this.currentCertificate.images.length - 1) {
      this.currentImageIndex++;
      this.selectImage(this.currentImageIndex);
    }
  }
}

// Initialize certificate modal when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.certificateModalInstance = new CertificateModal();
});
