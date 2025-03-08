// function loadProjects() {
//   let projects = JSON.parse(localStorage.getItem("projects")) || [];
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   let projectsContainer = document.querySelector(".projects");

//   if (!projectsContainer) {
//     console.error("Error: .projects container not found!");
//     return;
//   }

//   let currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   if (currentUser.role !== "admin") {
//     projects = projects.filter(t => t.students.includes(currentUser.username));
//   }

//   projectsContainer.innerHTML = "";

//   projects.forEach((project) => {
//     let relatedTasks = tasks.filter(task => task.project.trim() === project.title.trim());
    
//     console.log(`Project: ${project.title}`);
//     console.log(`Related Tasks:`, relatedTasks); // Debugging output

//     let totalTasks = relatedTasks.length;
//     let completedTasks = relatedTasks.filter(task => task.status.trim().toLowerCase() === "Completed").length;
    
//     console.log(`Total Tasks: ${totalTasks}, Completed Tasks: ${completedTasks}`);

//     let progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

//     let projectCard = `
//       <div class="project-card">
//         <h3 class="title">${project.title}</h3>
//         <p><strong>Description:</strong> ${project.description}</p>
//         <p><strong>Students:</strong> ${project.students.join(", ")}</p>
//         <p><strong>Category:</strong> ${project.category}</p>
//         <div class="progress">
//           <div class="progress-bar" style="width: ${progressPercentage}%;">
//             ${progressPercentage}%
//           </div>
//         </div>
//         <div class="dates">
//           <p>Start: ${project.startDate}</p>
//           <p>End: ${project.endDate}</p>
//         </div>
//       </div>
//     `;
//     projectsContainer.innerHTML += projectCard;
//   });
// }

function loadProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  let projectsContainer = document.querySelector(".projects");

  if (!projectsContainer) {
    console.error("Error: .projects container not found!");
    return;
  }

   let currentUser=JSON.parse(localStorage.getItem("currentUser"))
   if(currentUser.role!="admin")
    projects=projects.filter(t=>t.students.includes(currentUser.username));
  
 
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



