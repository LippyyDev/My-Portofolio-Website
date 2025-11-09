// Project Card Component JavaScript

// Function to create project card HTML
function createProjectCard(projectData) {
  // Check if project has a valid link
  const hasLink = projectData.link && projectData.link.trim() !== "";
  const buttonHTML = hasLink
    ? `<button class="btn btn-primary" onclick="showProjectDetails('${projectData.id}')">
        <i class="fas fa-eye mobile-icon"></i>
        <span class="desktop-text">About More</span>
      </button>`
    : `<button class="btn btn-primary" disabled style="opacity: 0.5; cursor: not-allowed;">
        <i class="fas fa-eye mobile-icon"></i>
        <span class="desktop-text">About More</span>
      </button>`;

  return `
    <div class="project-card-container">
      <div class="project-card">
        <img
          src="${projectData.image}"
          alt="${projectData.title}"
          class="project-image"
        />
        <div class="project-overlay">
          <div class="project-footer">
            <div class="footer-content">
              <div class="footer-text">
                <span class="project-name">${projectData.name}</span>
                <span class="project-category">${projectData.category}</span>
              </div>
              ${buttonHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Project data
const projectsData = [
  {
    id: "project1",
    image: "assets/img/project/Project1.jpg",
    title: "UI/UX Design – Website ObesiFit",
    subtitle: "Educational Platform for Obesity Prevention",
    name: "ObesiFit Website",
    category: "UI/UX Design",
    description:
      "Website ObesiFit is designed as an educational platform focused on obesity prevention and management through health information and healthy lifestyle support features. This UI/UX design aims to create an intuitive user experience while facilitating the development team in the system implementation process.",
    link: "https://www.figma.com/design/vu0f45JiRwD9leKMSaloKw/ObesiFit-Hifi?node-id=0-1&t=7ObhDzAHFfe9Z1aa-1",
  },
  {
    id: "project2",
    image: "assets/img/project/Project2.jpg",
    title: "UI/UX Design – NutriPal Application",
    subtitle: "Daily Calorie Management Tool",
    name: "NutriPal App",
    category: "UI/UX Design",
    description:
      "NutriPal application is developed as a tool to help manage daily calorie needs and achieve ideal body weight. The design focuses on ease of navigation and efficient user experience, thus accelerating the application development process by the developer team.",
    link: "https://www.figma.com/design/d7DBNabeSiyE7lzjMHu0IZ/NutriPal?node-id=1-1769&t=wXsZEqNGI5Vog1Ga-1",
  },
  {
    id: "project3",
    image: "assets/img/project/Project3.jpg",
    title: "Website FinansialKu",
    subtitle: "Personal Finance Management Platform",
    name: "FinansialKu Website",
    category: "Web Development",
    description:
      "This website functions as a personal finance management platform that helps users manage income, expenses, and daily financial planning. The system is designed to provide convenience, organization, and efficiency in digital financial management.",
    link: "https://github.com/LippyyDev/Financial-Website",
  },
  {
    id: "project4",
    image: "assets/img/project/Project4.jpg",
    title: "Website Massipa",
    subtitle: "Discipline Data Management System",
    name: "Massipa Website",
    category: "Web Development",
    description:
      "Massipa website is intended to support the Makassar Religious High Court in managing judge and employee discipline data. This platform facilitates monitoring, recapitulation, and integrated discipline reporting between PTA Makassar and PA throughout South Sulawesi.",
    link: "https://massipa.pta-makassar.go.id/",
  },
  {
    id: "project5",
    image: "assets/img/project/Project5.png",
    title: "Website Async",
    subtitle: "Store Management System",
    name: "Async Website",
    category: "Web Development",
    description:
      "Async website is designed as a store management system that includes product data management, inventory, and cashier transactions. This solution simplifies store operational processes while increasing transparency and security from potential internal fraud.",
    link: "",
  },
  {
    id: "project6",
    image: "assets/img/project/Project6.jpg",
    title: "NutriPal Application",
    subtitle: "Calorie Consumption Management",
    name: "NutriPal App",
    category: "Mobile Development",
    description:
      "NutriPal application functions to help users manage daily calorie consumption and achieve a balanced healthy lifestyle. Through intake monitoring features and nutritional recommendations, users can easily understand and control their calorie needs.",
    link: "https://github.com/LippyyDev/NutriPal-App",
  },
  {
    id: "project7",
    image: "assets/img/project/Project7.jpg",
    title: "Todofy Application",
    subtitle: "Task Management System",
    name: "Todofy App",
    category: "Mobile Development",
    description:
      "Todofy application is designed to help users manage activity lists (to-do list) effectively and productively. This system supports time management and task priorities so users can work more organized.",
    link: "https://github.com/LippyyDev/Todofy-App",
  },
  {
    id: "project8",
    image: "assets/img/project/Project8.jpg",
    title: "Mosque Management System",
    subtitle: "Digital Mosque Administration",
    name: "Mosque Management",
    category: "Web Development",
    description:
      "This website functions as a mosque management system to manage administrative data, activities, and finances digitally. Its implementation increases operational efficiency, report transparency, and mosque management professionalism.",
    link: "https://github.com/LippyyDev/Mosque-Management-System",
  },
  {
    id: "project9",
    image: "assets/img/project/Project9.jpg",
    title: "Desktop Application SiAdam",
    subtitle: "Islamic Features Management",
    name: "SiAdam Desktop App",
    category: "Desktop Development",
    description:
      "SiAdam application provides various Islamic features such as mosque data management, zakat calculation, qibla direction, and prayer schedules. This system is designed to support administrators and congregations in accessing religious information in an integrated and modern way.",
    link: "https://github.com/LippyyDev/SIADAM-Mosque-Administration-System",
  },
];

// Function to render all project cards with marquee layout
function renderProjectCards() {
  const projectsScroll = document.getElementById("projects-scroll");

  if (projectsScroll) {
    // Create cards for each project
    let cardsHTML = projectsData
      .map((project) => createProjectCard(project))
      .join("");

    // Duplicate the cards for seamless infinite scroll
    cardsHTML += projectsData
      .map((project) => createProjectCard(project))
      .join("");

    projectsScroll.innerHTML = cardsHTML;

    // Force visibility
    projectsScroll.style.opacity = "1";
    projectsScroll.style.visibility = "visible";
    projectsScroll.style.display = "flex";

    // Make sure all cards are visible
    const cards = projectsScroll.querySelectorAll(".project-card-container");
    cards.forEach((card) => {
      card.style.opacity = "1";
      card.style.visibility = "visible";
      card.style.display = "flex";
    });
  }
}

// Function to show project details (redirect to link)
function showProjectDetails(projectId) {
  const project = projectsData.find((p) => p.id === projectId);
  if (project) {
    // Check if project has a valid link
    if (project.link && project.link.trim() !== "") {
      // Open link in new tab
      window.open(project.link, "_blank");
    }
    // If no link (like Async Website), do nothing
  }
}

// Initialize project cards when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  renderProjectCards();

  // Add scroll animation control
  const projectsScroll = document.getElementById("projects-scroll");
  if (projectsScroll) {
    // Pause animation on hover
    projectsScroll.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
    });

    // Resume animation on mouse leave
    projectsScroll.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
    });

    // Manual scroll control
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

    projectsScroll.addEventListener("mousedown", function (e) {
      isScrolling = true;
      this.style.animationPlayState = "paused";
      startX = e.pageX - this.offsetLeft;
      scrollLeft = this.scrollLeft;
      this.style.cursor = "grabbing";
    });

    projectsScroll.addEventListener("mouseleave", function () {
      isScrolling = false;
      this.style.cursor = "grab";
      this.style.animationPlayState = "running";
    });

    projectsScroll.addEventListener("mouseup", function () {
      isScrolling = false;
      this.style.cursor = "grab";
      this.style.animationPlayState = "running";
    });

    projectsScroll.addEventListener("mousemove", function (e) {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.pageX - this.offsetLeft;
      const walk = (x - startX) * 2;
      this.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    projectsScroll.addEventListener("touchstart", function (e) {
      isScrolling = true;
      this.style.animationPlayState = "paused";
      startX = e.touches[0].pageX - this.offsetLeft;
      scrollLeft = this.scrollLeft;
    });

    projectsScroll.addEventListener("touchend", function () {
      isScrolling = false;
      this.style.animationPlayState = "running";
    });

    projectsScroll.addEventListener("touchmove", function (e) {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.touches[0].pageX - this.offsetLeft;
      const walk = (x - startX) * 2;
      this.scrollLeft = scrollLeft - walk;
    });

    // Set cursor style
    projectsScroll.style.cursor = "grab";
  }
});

// Export for use in other scripts
window.ProjectCard = {
  createProjectCard,
  renderProjectCards,
  showProjectDetails,
  projectsData,
};
