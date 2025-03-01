const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("keyup", function (e) {
  let query = e.target.value.toLowerCase();
  let projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    let title = card.querySelector(".title").textContent.toLowerCase();
    
    if (title.includes(query) || query === "") {
      card.style.display = "block"; // Show matching cards
    } else {
      card.style.display = "none"; // Hide non-matching cards
    }
  });
});
