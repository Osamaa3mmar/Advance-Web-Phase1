function filterProjectsByStatus(status) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Filter projects based on user role
  if (currentUser.role != "admin") {
    projects = projects.filter((t) => t.students.includes(currentUser.username));
  }

  // Filter projects based on the selected status
  if (status !== "all") {
    projects = projects.filter((project) => project.status === status);
  }

  renderProjects(projects);
}

function getPercent(project) {
  let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  let count = 0;
  let count_of_completed = 0;

  Tasks = Tasks.filter((t) => {
    console.log(`${t.project}==${project}`);
    return t.project == project;
  });
  count = Tasks.length;
  Tasks = Tasks.filter((t) => t.status == "Completed");
  count_of_completed = Tasks.length;
  if (count == count_of_completed) return 100;
  return Math.round((count_of_completed / count) * 10000) / 100;
}

function loadProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let projectsContainer = document.querySelector(".projects");

  if (!projectsContainer) {
    console.error("Error: .projects container not found!");
    return;
  }

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser.role != "admin")
    projects = projects.filter((t) =>
      t.students.includes(currentUser.username)
    );

  projectsContainer.innerHTML = "";

  projects.forEach((project) => {
    let projectCard = `
            <div class="project-card" data-project-title="${project.title}">
                <h3 class="title">${project.title}</h3>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Students:</strong> ${project.students.join(", ")}</p>
                <p><strong>Category:</strong> ${project.category}</p>
                <div class="progress">
                    <div class="progress-bar" style="--i:${getPercent(
                      project.title
                    )}%;">
                    <span class="percent">${getPercent(project.title)}%</span>
                                <div class="bar"></div>
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

  // Add event listeners to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      let projectTitle = card.getAttribute("data-project-title");
      showProjectDetails(projectTitle);
    });
  });
}

function showProjectDetails(projectTitle) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  const project = projects.find(p => p.title === projectTitle);

  if (!project) {
      console.error("Project not found!");
      return;
  }

  const projectInfo = document.querySelector(".project-info");
  
  if (!projectInfo) {
      console.error("Error: .project-info container not found!");
      return;
  }

  const taskList = projectInfo.querySelector(".task-list");
  if (!taskList) {
      console.error("Error: .task-list not found inside .project-info!");
      return;
  }

  projectInfo.querySelector(".project-title").textContent = project.title;
  projectInfo.querySelector(".project-description").textContent = project.description;
  projectInfo.querySelector(".project-category").textContent = project.category;
  projectInfo.querySelector(".project-students").textContent = project.students.join(", ");
  projectInfo.querySelector(".project-start").textContent = project.startDate;
  projectInfo.querySelector(".project-end").textContent = project.endDate;

  taskList.innerHTML = "";

  tasks.filter(task => task.project === projectTitle)
      .forEach(task => {
          const taskCard = document.createElement("div");
          taskCard.className = "task-card";
          taskCard.innerHTML = `
              <p><strong>Task ID:</strong> ${task.id}</p>
              <p><strong>Task Name:</strong> ${task.title}</p>
              <p><strong>Description:</strong> ${task.description}</p>
              <p><strong>Assigned Student:</strong> ${task.assignedStudent}</p>
              <p><strong>Status:</strong> 
                  <span class="status ${task.status.toLowerCase().replace(' ', '-')}">
                      ${task.status}
                  </span>
              </p>
          `;
          taskList.appendChild(taskCard);
      });

  projectInfo.classList.add("active");

  // Ensure close button event listener is only added once
  const closeBtn = projectInfo.querySelector(".close-btn");
  if (closeBtn && !closeBtn.hasEventListener) {
      closeBtn.addEventListener("click", () => {
          projectInfo.classList.remove("active");
      });
      closeBtn.hasEventListener = true; // Prevent duplicate event listeners
  }
}


// Call loadProjects to load the projects when the page loads
document.addEventListener("DOMContentLoaded", loadProjects);