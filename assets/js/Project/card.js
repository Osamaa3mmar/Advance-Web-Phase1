document.addEventListener("DOMContentLoaded", function () {
  loadProjects();
});

function loadProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  let projectsContainer = document.querySelector(".projects");

  if (!projectsContainer) {
    console.error("Error: .projects container not found!");
    return;
  }

  projectsContainer.innerHTML = "";

  projects.forEach((project) => {
    let projectCard = `
    
            <div class="project-card">
                <h3 class="title">${project.title}</h3>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Students:</strong> ${project.students.join(", ")}</p>
                <p><strong>Category:</strong> ${project.category}</p>
                <div class="progress">
                    <div class="progress-bar" style="width: ${
                      project.status === "completed" ? "100%" : "50%"
                    };">
                        ${project.status === "completed" ? "100%" : "50%"}
                    </div>
                </div>
                <div class="dates">
                    <p>Start: ${project.startDate}</p>
                    <p>End: ${project.endDate}</p>
                </div>
            </div>
            
        `;
    projectsContainer.innerHTML += projectCard;
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const statusFilter = document.querySelector(".status");
  
  const statusMapping = {
      "all": null,
      "in-progress": 50,
      "completed": 100,
      "pending": 25,
      "on-hold": 10,
      "cancelled": 0
  };

  statusFilter.addEventListener("change", function () {
      const selectedValue = statusFilter.value;
      const filterValue = statusMapping[selectedValue];

      filterProjects(filterValue);
  });

  function filterProjects(progress) {
      const projectCards = document.querySelectorAll(".project-card");

      projectCards.forEach(card => {
          const progressBar = card.querySelector(".progress-bar");
          const progressValue = parseInt(progressBar.style.width, 10); // Extract percentage value

          if (progress === null || progressValue === progress) {
              card.style.display = "block"; // Show matching cards
          } else {
              card.style.display = "none"; // Hide non-matching cards
          }
      });
  }
});