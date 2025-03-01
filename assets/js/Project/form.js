document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".submit-btn").addEventListener("click", function () {
    let title = document.querySelector(".form-input[type='text']").value;
    let description = document.querySelector(".form-textarea").value;
    let students = Array.from(document.querySelectorAll(".student-item")).map((el) => el.innerText);
    let category = document.querySelector(".form-select").value;
    let startDate = document.querySelector(".form-input[type='date']").value;
    let endDate = document.querySelectorAll(".form-input[type='date']")[1].value;
    let status = document.querySelectorAll(".form-select")[1].value;

    if (!title || !category || !startDate || !endDate) {
      alert("Please fill all required fields!");
      return;
    }

    let project = { title, description, students, category, startDate, endDate, status };

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    alert("Project saved successfully!");

    document.querySelector(".form-input[type='text']").value = "";
    document.querySelector(".form-textarea").value = "";
    document.querySelector(".form-select").value = "";
    document.querySelector(".form-input[type='date']").value = "";
    document.querySelectorAll(".form-input[type='date']")[1].value = "";

    loadProjects();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve students from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Select the students-list container
  const studentsListContainer = document.getElementById("studentsList");

  // Filter users with role 'student'
  const students = users.filter(user => user.role === "user");

  // Populate the students list
  students.forEach(student => {
      const studentItem = document.createElement("div");
      studentItem.classList.add("student-item");
      studentItem.textContent = student.username;
      studentsListContainer.appendChild(studentItem);
  });
});
