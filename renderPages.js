const app=document.querySelector('.app');
let currentPage=localStorage.getItem('currentPage');
const osama=document.querySelector('.osama');
let dateInterval;
let chart;
const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#000", 
    color: "#fff",        
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  const loadLayout=(pageId)=>{
    
    const user=JSON.parse(localStorage.getItem("currentUser"));
    if(user == null){
        localStorage.setItem('currentPage','login');
    }
    const layout=`<div class="app-layout">
        <div class="top-bar">
            <div class="name">
                <div class="role-tag">${user.role}</div>
                <h3 class="username">${user.username} </h3>
            </div>
            <button onclick="logout()">Logout</button>
        </div>
        <div class="content">
        <div class="sidebar">
            <div class="control-sidebar">
            <i onclick="toggleSideBar()" class="cret fa-solid fa-caret-left"></i>
        </div>
            <ul>
                <li onclick='goToPages("home")' class="nav-item ${pageId=='home'?'nav-item-active':''}"><i class="fa-solid fa-house"></i> Home</li>
                <li onclick='goToPages("projects")' class="nav-item ${pageId=='projects'?'nav-item-active':''}"><i class="fa-solid fa-diagram-project"></i> Projects</li>
                <li onclick='goToPages("tasks")' class="nav-item ${pageId=='tasks'?'nav-item-active':''}"><i class="fa-solid fa-list-check"></i> Tasks</li>
                <li onclick='goToPages("chat")' class="nav-item ${pageId=='chat'?'nav-item-active':''}"><i class="fa-solid fa-message"></i> Chat</li>
            </ul>
        </div>
        <div class="page">
            
        </div>
    </div>
    </div>`;
    app.innerHTML=layout;
    document.querySelector('.username').innerHTML=JSON.parse(localStorage.getItem("currentUser")).username;
    document.querySelector('.role-tag').innerHTML=JSON.parse(localStorage.getItem("currentUser")).role;
    }
const renderHomePage=()=>{
    loadLayout('home');
    let currStu=JSON.parse(localStorage.getItem("currentUser"))

    const page=document.querySelector(".page");
    page.innerHTML=currStu.role=="admin"?`
    <div class="containerofHomePage">
<div class="headofHomePage">  <span class="title">Welcome to the Task Managment System</span>
    <span id="date"></span> </div>
      

    <div class="cards_bar">
    <div class="cards" >number of Projects <br> <span id="Projects_count">5</span></div>
    <div class="cards">number of Students <br> <span id="Students_count">5</span></div>
    <div class="cards">number of Tasks <br> <span id="Tasks_count">5</span></div>
    <div class="cards">number of Finished Projects <br> <span id="Finished_Projects_count">5</span></div>
    </div>
    <div id="bottom">
        <span>Admin Dashboard Overview</span>
        <canvas id="myChart"></canvas>
    </div>
   
    </div>`:`
    <div class="containerofHomePage">

        <span class="title">Welcome to the Task Managment System</span>
    <span id="date"></span>

    <h1 id="Welcome_msg">Welcome ${JSON.parse(localStorage.getItem("currentUser")).username}</h1>
   
    </div>
    `;
   if(currStu.role=="admin"){    
    let chart=build_chart();
    chart=setInterval(()=>{chart.indexAxis=window.screen.width<450? 'y':""; console.log()},1000);
}

   dateInterval=setInterval(()=>{   
     let d=new Date();
    const options = {
  weekday: 'long', 
  year: 'numeric', 
  month: 'long',  
  day: 'numeric',  
  hour: 'numeric', 
  minute: 'numeric',
  second: 'numeric',
  hour12: true,    
};

const formatter = new Intl.DateTimeFormat('en-US', options);
const formattedDate = formatter.format(d);

    document.getElementById("date").innerHTML=formattedDate;

},1000)
}

const renderTasksPage=()=>{
    let user=JSON.parse(localStorage.getItem("currentUser")).role

    loadLayout('tasks');
    const page=document.querySelector(".page");
    page.innerHTML=`
    <div class="TaskPageContainer">
    <div class="header">
        <div class="sort-container">
            <label>Sort By:</label>
            <select id="sortSelect" onchange="SortByHandler(event)">
                <option value="status">Task Status</option>
                <option value="dueDate">Due Date</option>
                <option value="project">Project</option>
                <option value="assigned">Assigned Student</option>

            </select>
        </div>
        <button class="create-btn" onclick="openModal()">Create a New Task</button>
    </div>

    <table>
        <thead>
            <tr>
                <th>Task ID</th>
                <th>Project</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Assigned Student</th>
                <th>Status</th>
                <th>Due Date</th>
            </tr>
        </thead>
        <tbody id="taskTableBody" onload="">
           
        </tbody>
    </table>

    <!-- Task Modal -->
    <div id="taskModal" class="modal">
        <div class="modal-content">
            <form id="taskForm" class="modal-form">
                <div class="head" style="display: flex; justify-content: space-between; align-items: center;">
                    <h1>Create new Task</h1> 
                    <span onclick="closeModal()" style="font-size: 30px; ">x</span></div>
                <input type="hidden" id="taskId">
                <div class="Form-input">
                    <label for="project">Project:</label>
                    <select id="project" onchange="init_users_list(this.value)">
                    </select>
                </div>
                <div class="Form-input">
                    <label for="taskName">Task Name:</label>
                    <input type="text" id="taskName" required>
                </div>
                <div class="Form-input">
                    <label for="description">Description:</label>
                    <textarea id="description" required></textarea>
                </div>
                <div class="Form-input">
                    <label for="assigned">Assigned Student:</label>
                     <select id="assigned" >
                <option>pi</option>
                    </select>
                </div>
                <div class="Form-input">
                    <label for="dueDate">Due Date:</label>
                    <input type="date" id="dueDate" required>
                </div>
                <div class="button-group">
                    <button type="button" onclick="saveTask()" class="create-btn">Add Task</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    `;
    BuildPage();

}
const renderProjectsPage=()=>{
    loadLayout('projects');
    const page=document.querySelector(".page");
    page.innerHTML=`  <div class="project-container">
                    
        <h1 class="title">Projects Overview</h1>
        <div class="header">
            <button class="add-project" onclick="document.getElementById('projectModal').classList.add('active')">
                Add New Project
            </button>
           <input type="text" class="search-bar" placeholder="Search projects by title..." onkeyup="searchProjects()">
        <select class="status" onchange="loadProjects()">
            <option value="all">All Statuses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
        </select>
        </div>
        <br>
        <div class="project-info">
            <button class="close-btn">x</button>
            <h2 class="project-title"></h2>
            <hr>
            <br>
            <p class="project-description"></p>
            <p><strong style="color :gold">Category:</strong> <span class="project-category"></span></p>
            <p><strong style="color :gold">Students:</strong> <span class="project-students"></span></p>
            <p><strong style="color :gold">Start Date:</strong> <span class="project-start"></span></p>
            <p><strong style="color :gold">End Date:</strong> <span class="project-end"></span></p>
            <br>
            <hr>
            <div class="task-list"></div>
        </div>
        <div class="cards-content">
            <div class="projects">
                <script src="./assets/js/Project/card.js"></script>
            </div>
        </div>

        <div id="projectModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Add New Project</h2>
                    <button class="close-btn" onclick="document.getElementById('projectModal').classList.remove('active')">&times;</button>
                </div>
    
                <div class="group">
                    <div class="form-group">
                        <label class="form-label">Project Title:</label>
                        <input type="text" class="form-input" required>
                    </div>
    
                    <div class="form-group">
                        <label class="form-label">Project Description:</label>
                        <textarea class="form-textarea" required></textarea>
                    </div>
    
                    <div class="form-group">
                        <label class="form-label">Students List:</label>
                        <div class="students-list" id="studentsList">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Project Category:</label>
                        <select class="form-select" required>
                            <option value="" disabled selected>Select a category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Design">Design</option>
                            <option value="Research">Research</option>
                        </select>
                    </div>
    
                    <div class="date-inputs">
                        <div class="form-group">
                            <label class="form-label">Starting Date:</label>
                            <input type="date" class="form-input" required>
                        </div>
    
                        <div class="form-group">
                            <label class="form-label">Ending Date:</label>
                            <input type="date" class="form-input" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Project Status:</label>
                        <select class="form-select" required>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="on-hold">On Hold</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <button class="submit-btn" onclick="saveProject()">Add Project</button>
                    
                </div>
            </div>
        </div> 
    </div>`;
    loadProjects();
    loadStudents();
    addCard();
}
const renderChatPage=()=>{
    const tempUsers=JSON.parse(localStorage.getItem('users'));
    loadLayout('chat');
    const page=document.querySelector(".page");
    page.innerHTML= `  <div class="chat">
    <div class="sideUser">
        <h3>List of Students</h3>
        <ul class="user-list">
        ${tempUsers?tempUsers.map((user)=>{
            if(user.id!=JSON.parse(localStorage.getItem('currentUser')).id&&JSON.parse(localStorage.getItem('currentUser')).role=='admin')
            return`<li onclick="currentUser(${user.id})">${user.username}</li>`
        else if(user.id!=JSON.parse(localStorage.getItem('currentUser')).id&&user.role=='admin')
            return`<li onclick="currentUser(${user.id})">${user.username}</li>`

        }).join(''):'Empty'}
        </ul>
    </div>
    <div class="chat-area">
        <div class="chat-box-start">
        <h2> Chose Person To Start Chating ...</h2>
        </div>

        <div class="hide chat-box">
        <div class="chat-container">
        <div class="messages-box">
        <div class="message-info">
        <h3>Osama</h3>
        </div>
        <div class="messages">
        
        </div>
        </div>
        <form class="msg-form" onsubmit="message(event)">
        <input class="text-input" placeholder="Type Your Message . . . " type="text" requierd/>
        <input class="submit-input"  type="submit" value="Send"/>
        </form>
        </div>
        </div>
    </div>
</div>`;
}

const renderLoginPage=()=>{
    app.innerHTML=` <div class="auth-form-container">
    <form autocomplete="off" class="auth-form" onsubmit="login(event)">
    <h1>Sign In</h1>
        <div class="form-group">
            <label for="login-username">Username</label>
            <input required type="text" id="login-username">
        </div>
        <div class="form-group">
            <label for="login-password">Password</label>
            <input required type="password" id="login-password">
        </div>
        <div class="select-box">
            <input type="checkbox" class="stay-signed"  id="stay-signed">
            <label for="stay-signed">Stay Signed In</label>
        </div>
        <input type="submit" class='auth-btn' value="Sign In">
        <p class="sign-up-btn-page" onclick="goToSignUpPage()">Dont have an account ? <span>signUp</span></p>
    </form>
</div>`;

}

const renderSignupPage=()=>{
    app.innerHTML=` <div class="auth-form-container">
        <form autocomplete="off" onsubmit="signUpSubmit(event)" class="auth-form">
        <h1>Sign Up</h1>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" required id="username" name="username">
                
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" required id="password" name="password">
                
            </div>

            <div class="select-box">
            <input type="checkbox" class="University-id-box" onchange='universityStudent()' id="student-box">
                <label for="student-box">I am a student</label>
                
            </div>
            <div  class="form-group university-id-container">
                <label for="University-id">University ID</label>
                <input type="text"  id="University-id" name="University-id">
            </div>

            <input type="submit" value="Sign Up" class='auth-btn'>
            <p onclick="goToLoginPage()">Have an account ? <span>login</span></p>
        </form>
    </div>`
}
const renderEmpty=()=>{
    app.innerHTML='<div>Page not found</div>';
}


const renderCurrentPage=()=>{
    clearInterval(dateInterval)
    clearInterval(chart)
    if (!currentPage) currentPage = 'login';
    const stay=JSON.parse(localStorage.getItem("stay"));
    console.log(stay)
    if(stay){
        localStorage.setItem('currentPage', currentPage);
    }
    if(currentPage==null||currentPage==''){
        renderLoginPage();
    }
    else if(currentPage=='login'){
        renderLoginPage();
    }
    else if(currentPage=='signup'){
        renderSignupPage();
    }
    else if(currentPage=='home'){
        renderHomePage();
    }
    else if(currentPage=='tasks'){
        
        renderTasksPage();
    }
    else if(currentPage=='projects'){
        
        renderProjectsPage();
    }
    else if(currentPage=='chat'){
        
        renderChatPage();
    }
    else {
        renderEmpty();
    }
}
const renderData=()=>{
    const projects=JSON.parse(localStorage.getItem('projects'));
    const users=JSON.parse(localStorage.getItem('users'));
    const tasks=JSON.parse(localStorage.getItem('Tasks'));
    console.log(projects,users,tasks)
    if(!projects){
        console.log("1");
        localStorage.setItem("projects",JSON.stringify(
            
            [{"title":"AI Chatbot","description":"A chatbot using NLP for customer support.","students":["sara","omar"],"category":"Web Development","startDate":"2025-03-04","endDate":"2025-03-14","status":"in-progress"},{"title":"Smart Home System","description":"An IoT-based home automation system.","students":["mariam","tariq"],"category":"Mobile Development","startDate":"2025-03-27","endDate":"2025-03-22","status":"on-hold"},{"title":"E-Commerce Website","description":"A full-stack e-commerce website with payment integration.","students":["mariam","tariq"],"category":"Web Development","startDate":"2025-03-06","endDate":"2025-03-14","status":"cancelled"},{"title":"Self-Driving Car Simulation","description":"A machine learning-based self-driving car simulation.","students":["ahmad"],"category":"Research","startDate":"2025-03-11","endDate":"2025-03-22","status":"completed"},{"title":"Online Learning Platform","description":"A web platform for online courses with interactive features.","students":["ahmad","sara"],"category":"Web Development","startDate":"2025-03-19","endDate":"2025-03-25","status":"in-progress"},{"title":"Health Tracker App","description":"A mobile app that tracks daily health metrics.","students":["tariq","omar"],"category":"Mobile Development","startDate":"2025-03-04","endDate":"2025-03-11","status":"pending"},{"title":"Smart Traffic System","description":"An AI-based traffic control system to reduce congestion.","students":["khaled","mariam"],"category":"Design","startDate":"2025-03-23","endDate":"2025-03-29","status":"pending"}]
          ))
    }
    if(!users){
        console.log("2");
        localStorage.setItem("users",JSON.stringify(
            
            [{"username":"ahmad","password":"1234","universityId":"123123","role":"student","color":223176,"id":1},{"username":"osama","password":"1234","universityId":"","role":"admin","color":374227,"id":2},{"username":"sara","password":"1234","universityId":"1211111","role":"student","color":767149,"id":3},{"username":"khaled","password":"4321","universityId":"987654","role":"student","color":21973,"id":4},{"username":"mariam","password":"pass","universityId":"654321","role":"student","color":255546,"id":5},{"username":"tariq","password":"ssddaa","universityId":"123123112","role":"student","color":225695,"id":6},{"username":"asem","password":"1234","universityId":"","role":"admin","color":238343,"id":7},{"username":"omar","password":"123123","universityId":"222211111","role":"student","color":985854,"id":8}]
          ))
    }
    if(!tasks){
        console.log("3");
        localStorage.setItem("Tasks",JSON.stringify(
            [{"id":1,"project":"AI Chatbot","taskName":"Develop API","description":"Set up the backend API for the project.","assigned":"omar","status":"In Progress","dueDate":"2025-03-26"},{"id":2,"project":"Smart Traffic System","taskName":"Design Homepage","description":"Create a responsive design for the homepage.","assigned":"khaled","status":"Completed","dueDate":"2025-03-28"},{"id":3,"project":"E-Commerce Website","taskName":"Write Documentation","description":"Document the project setup and usage.","assigned":"mariam","status":"In Progress","dueDate":"2025-03-14"},{"id":4,"project":"Health Tracker App","taskName":"Testing","description":"onduct testing for all features.","assigned":"tariq","status":"Pending","dueDate":"2025-03-22"},{"id":5,"project":"E-Commerce Website","taskName":"Deploy Application","description":"Deploy the application to the production server.","assigned":"mariam","status":"Pending","dueDate":"2025-03-20"},{"id":6,"project":"AI Chatbot","taskName":"Design UI","description":"Create an intuitive and user-friendly UI.","assigned":"sara","status":"Completed","dueDate":"2025-03-26"},{"id":7,"project":"Health Tracker App","taskName":"Develop Backend","description":"Implement the database and API logic.","assigned":"tariq","status":"Completed","dueDate":"2025-03-28"},{"id":8,"project":"AI Chatbot","taskName":"Train NLP Model","description":"Train the AI chatbot model using sample conversations.","assigned":"sara","status":"In Progress","dueDate":"2025-03-18"},{"id":9,"project":"AI Chatbot","taskName":"Deploy Chatbot","description":"Deploy the chatbot on the website.","assigned":"omar","status":"In Progress","dueDate":"2025-03-25"},{"id":10,"project":"Online Learning Platform","taskName":"Develop Backend","description":"Implement the database and API logic.","assigned":"ahmad","status":"Completed","dueDate":"2025-03-16"}]
          ))
    }
}


renderData();
renderCurrentPage();
