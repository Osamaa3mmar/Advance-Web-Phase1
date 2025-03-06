function saveProject() {
  let title = document.querySelector(".form-input[type='text']").value;
  let description = document.querySelector(".form-textarea").value;
  let students = Array.from(document.querySelectorAll(".student-item input[type='checkbox']:checked")).map(el => el.value);
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

  // Clear input fields
  document.querySelector(".form-input[type='text']").value = "";
  document.querySelector(".form-textarea").value = "";
  document.querySelector(".form-select").value = "";
  document.querySelector(".form-input[type='date']").value = "";
  document.querySelectorAll(".form-input[type='date']")[1].value = "";

  loadProjects();
}

function loadStudents() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const studentsListContainer = document.getElementById("studentsList");
  studentsListContainer.innerHTML = ""; // Clear existing list

  const students = users.filter(user => user.role != "admin");

  students.forEach(student => {
      const studentItem = document.createElement("div");
      studentItem.classList.add("student-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `student-${student.username}`;
      checkbox.name = "students";
      checkbox.value = student.username;

      const label = document.createElement("label");
      label.htmlFor = `student-${student.username}`;
      label.textContent = student.username;

      studentItem.appendChild(checkbox);
      studentItem.appendChild(label);
      studentsListContainer.appendChild(studentItem);
  });
}

// // Call loadStudents on page load
// window.onload = loadStudents;