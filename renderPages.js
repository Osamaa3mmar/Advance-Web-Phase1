const app=document.querySelector('.app');
let currentPage=localStorage.getItem('currentPage');
const osama=document.querySelector('.osama');


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
    const layout=`<div class="app-layout">
        <div class="top-bar">
            <div class="name">
                <div class="role-tag">admin</div>
                <h3 class="username">osama </h3>
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
    const page=document.querySelector(".page");
    page.innerHTML=`
    <div class="container">

        <span class="title">Welcome to the Task Managment System</span>
    <span id="date"></span>

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
   
    </div>`;
    fun1();
}

const renderTasksPage=()=>{
    loadLayout('tasks');
    const page=document.querySelector(".page");
    page.innerHTML="<div>Tasks</div>";
}
const renderProjectsPage=()=>{
    loadLayout('projects');
    const page=document.querySelector(".page");
    page.innerHTML=`  <div class="container">
                    
        <h1 class="title">Projects Overview</h1>
        <div class="header">
            <button class="add-project" onclick="document.getElementById('projectModal').classList.add('active')">
                Add New Project
            </button>
            <input type="text" class="search-bar" placeholder="Search projects by title or description...">
            <select class="status">
                <option value="all">All Statuses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
            </select>              
        </div>
        <br>
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
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile Development</option>
                            <option value="design">Design</option>
                            <option value="research">Research</option>
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
                            <option value="on-hold">On Hold</option>
                        </select>
                    </div>
    
                    <button type="submit" class="submit-btn">Add Project</button>
                </div>
            </div>
        </div> 
    </div>`;
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
            if(user.id!=JSON.parse(localStorage.getItem('currentUser')).id)
            return`<li onclick="currentUser(${user.id})">${user.username}</li>`
        }).join(''):'Empty'}
        </ul>
    </div>
    <div class="chat-area">
        osama
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
    
    if(currentPage==null||currentPage==''){
        localStorage.setItem('currentPage','login');
        renderLoginPage();
    }
    else if(currentPage=='login'){
        localStorage.setItem('currentPage','login');

        renderLoginPage();
    }
    else if(currentPage=='signup'){
        localStorage.setItem('currentPage','signup');

        renderSignupPage();
    }
    else if(currentPage=='home'){
        localStorage.setItem('currentPage','home');
        renderHomePage();
    }
    else if(currentPage=='tasks'){
        localStorage.setItem('currentPage','tasks');
        renderTasksPage();
    }
    else if(currentPage=='projects'){
        localStorage.setItem('currentPage','projects');
        renderProjectsPage();
    }
    else if(currentPage=='chat'){
        localStorage.setItem('currentPage','chat');
        renderChatPage();
    }
    else {
        renderEmpty();
    }

}


renderCurrentPage();