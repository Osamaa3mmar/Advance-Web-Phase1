function searchProjects() {
  let query = document.querySelector(".search-bar").value.toLowerCase();
  let projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    let title = card.querySelector(".title").textContent.toLowerCase();

    card.style.display =
      title.includes(query) || query === "" ? "block" : "none";
  });
}

function filterProjects() {
  const statusMapping = {
    all: null,
    "in-progress": 50,
    completed: 100,
    pending: 25,
    "on-hold": 10,
    cancelled: 0,
  };

  const statusFilter = document.querySelector(".status");
  const selectedValue = statusFilter.value;
  const filterValue = statusMapping[selectedValue];

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const progressBar = card.querySelector(".progress-bar");
    const progressValue = parseInt(progressBar.style.width, 10); // Extract percentage value

    card.style.display =
      filterValue === null || progressValue === filterValue ? "block" : "none";
  });
}

function addCard() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (currentUser && currentUser.role !== "admin") {
    document.querySelector(".add-project").style.display = "none";
  }
}