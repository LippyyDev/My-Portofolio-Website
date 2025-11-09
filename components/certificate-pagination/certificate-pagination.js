// Certificate Pagination JavaScript
class CertificatePagination {
  constructor() {
    this.certificatesPerPage = 6;
    this.currentPage = 1;
    this.totalPages = 0;
    this.certificatesGrid = null;
    this.paginationContainer = null;
    this.certificateModal = null;

    this.certificatesData = [
      {
        id: 1,
        name: "Web Development & UI UX Design",
        issuer: "Celerates School",
        image: "assets/img/certificate/Sertifikat1.jpg",
        alt: "Web Development & UI UX Design",
      },
      {
        id: 2,
        name: "Belajar Dasar Manajemen Proyek",
        issuer: "Dicoding Indonesia",
        image: "assets/img/certificate/Sertifikat2.jpg",
        alt: "Belajar Dasar Manajemen Proyek",
      },
      {
        id: 3,
        name: "Website Development With Wordpress",
        issuer: "MySkill",
        image: "assets/img/certificate/Sertifikat3.jpg",
        alt: "Website Development With Wordpress",
      },
      {
        id: 4,
        name: "Fundamental Front-End Web Development II",
        issuer: "Coding Studio",
        image: "assets/img/certificate/Sertifikat4.jpg",
        alt: "Fundamental Front-End Web Development II",
      },
      {
        id: 5,
        name: "Fundamental Front-End Web Development 2021",
        issuer: "Coding Studio",
        image: "assets/img/certificate/Sertifikat5.webp",
        alt: "Fundamental Front-End Web Development 2021",
      },
      {
        id: 6,
        name: "Microsoft Excel - Beginner to Advance with Example",
        issuer: "Udemy",
        image: "assets/img/certificate/Sertifikat6.jpg",
        alt: "Microsoft Excel - Beginner to Advance with Example",
      },
      {
        id: 7,
        name: "HTML5 CSS3 Javascript Bootstrap & JQuery Masterclass 5 in 1",
        issuer: "Udemy",
        image: "assets/img/certificate/Sertifikat7.jpg",
        alt: "HTML5 CSS3 Javascript Bootstrap & JQuery Masterclass 5 in 1",
      },
      {
        id: 8,
        name: "AI Engineer Explorer",
        issuer: "Udemy",
        image: "assets/img/certificate/Sertifikat8.jpg",
        alt: "AI Engineer Explorer",
      },
      {
        id: 9,
        name: "Sertifikat Magang Industri",
        issuer: "Pengadilan Tinggi Agama Makassar",
        image: "assets/img/certificate/Sertifikat9.jpg",
        alt: "Sertifikat Magang Industri",
      },
    ];

    this.init();
  }

  init() {
    this.certificatesGrid = document.getElementById("certificates-grid");
    this.paginationContainer = document.getElementById("pagination-container");

    if (!this.certificatesGrid || !this.paginationContainer) {
      return;
    }

    this.totalPages = Math.ceil(
      this.certificatesData.length / this.certificatesPerPage
    );
    this.renderCertificates();
    this.renderPagination();
    this.setupEventListeners();
  }

  renderCertificates() {
    const startIndex = (this.currentPage - 1) * this.certificatesPerPage;
    const endIndex = startIndex + this.certificatesPerPage;
    const currentCertificates = this.certificatesData.slice(
      startIndex,
      endIndex
    );

    this.certificatesGrid.innerHTML = "";

    currentCertificates.forEach((certificate, index) => {
      const certificateCard = this.createCertificateCard(
        certificate,
        startIndex + index
      );
      this.certificatesGrid.appendChild(certificateCard);
    });

    // Setup modal integration after cards are rendered
    setTimeout(() => {
      this.setupModalIntegration();
      
      // Check if certificates section is in view and trigger animation
      this.checkAndTriggerAnimation();
    }, 50);
  }

  checkAndTriggerAnimation() {
    const certificatesSection = document.querySelector(".certificates");
    if (!certificatesSection) return;
    
    // Check if section is in viewport
    const rect = certificatesSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    
    if (isInView) {
      // Trigger animation if section is already in view (e.g., after pagination change)
      const certificateCards = document.querySelectorAll(".certificate-card");
      certificateCards.forEach((card, index) => {
        if (!card.classList.contains("animate")) {
          setTimeout(() => {
            card.classList.add("animate");
            card.classList.add("floating");
          }, 50 + index * 100);
        }
      });
    }
  }

  createCertificateCard(certificate, globalIndex) {
    const card = document.createElement("div");
    card.className = "certificate-card";
    card.setAttribute("data-certificate-index", globalIndex);

    card.innerHTML = `
      <div class="certificate-image">
        <img src="${certificate.image}" alt="${certificate.alt}" />
      </div>
      <div class="certificate-content">
        <h3>${certificate.name}</h3>
        <p>${certificate.issuer}</p>
      </div>
    `;

    // Add click event for modal
    card.addEventListener("click", () => {
      this.openCertificateModal(globalIndex);
    });

    return card;
  }

  renderPagination() {
    if (this.totalPages <= 1) {
      this.paginationContainer.innerHTML = "";
      return;
    }

    const pagination = document.createElement("div");
    pagination.className = "pagination";

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.className = "pagination-btn pagination-nav";
    prevBtn.innerHTML = "‹";
    prevBtn.disabled = this.currentPage === 1;
    prevBtn.setAttribute("aria-label", "Halaman sebelumnya");
    prevBtn.addEventListener("click", () =>
      this.goToPage(this.currentPage - 1)
    );
    pagination.appendChild(prevBtn);

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page + dots
    if (startPage > 1) {
      const firstBtn = this.createPageButton(1);
      pagination.appendChild(firstBtn);

      if (startPage > 2) {
        const dots = document.createElement("span");
        dots.className = "pagination-dots";
        dots.textContent = "...";
        pagination.appendChild(dots);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = this.createPageButton(i);
      pagination.appendChild(pageBtn);
    }

    // Last page + dots
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        const dots = document.createElement("span");
        dots.className = "pagination-dots";
        dots.textContent = "...";
        pagination.appendChild(dots);
      }

      const lastBtn = this.createPageButton(this.totalPages);
      pagination.appendChild(lastBtn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "pagination-btn pagination-nav";
    nextBtn.innerHTML = "›";
    nextBtn.disabled = this.currentPage === this.totalPages;
    nextBtn.setAttribute("aria-label", "Halaman selanjutnya");
    nextBtn.addEventListener("click", () =>
      this.goToPage(this.currentPage + 1)
    );
    pagination.appendChild(nextBtn);

    // Page info removed as requested

    this.paginationContainer.innerHTML = "";
    this.paginationContainer.appendChild(pagination);
  }

  createPageButton(pageNumber) {
    const button = document.createElement("button");
    button.className = "pagination-btn";
    button.textContent = pageNumber;

    if (pageNumber === this.currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => this.goToPage(pageNumber));
    return button;
  }

  goToPage(pageNumber) {
    if (
      pageNumber < 1 ||
      pageNumber > this.totalPages ||
      pageNumber === this.currentPage
    ) {
      return;
    }

    this.currentPage = pageNumber;
    this.renderCertificates();
    this.renderPagination();

    // Smooth scroll to certificates section
    const certificatesSection = document.getElementById("certificates");
    if (certificatesSection) {
      certificatesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.target.closest("#certificates")) {
        if (e.key === "ArrowLeft" && this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        } else if (
          e.key === "ArrowRight" &&
          this.currentPage < this.totalPages
        ) {
          this.goToPage(this.currentPage + 1);
        }
      }
    });
  }

  setupModalIntegration() {
    // Setup modal integration with certificate modal
    if (window.certificateModalInstance) {
      window.certificateModalInstance.setupDynamicCertificateCards();
    }
  }

  openCertificateModal(certificateIndex) {
    // Find the certificate modal instance
    if (window.certificateModalInstance) {
      window.certificateModalInstance.openModal(certificateIndex);
    } else {
    }
  }

  // Method to get certificate data for modal
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
}

// Initialize certificate pagination when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CertificatePagination();
});
