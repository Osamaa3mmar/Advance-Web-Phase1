const app=document.querySelector('.app');
let currentPage=localStorage.getItem('currentPage');
const osama=document.querySelector('.osama');
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
            <i class="fa-solid fa-caret-right"></i>
        </div>
            <ul>
                <li><i class="fa-solid fa-house"></i> Home</li>
                <li><i class="fa-solid fa-diagram-project"></i> Projects</li>
                <li><i class="fa-solid fa-list-check"></i> Tasks</li>
                <li><i class="fa-solid fa-message"></i> Chat</li>
            </ul>
        </div>

        <div class="page">
            
        </div>
    </div>
    </div>`;


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
  const loadLayout=()=>{
    app.innerHTML=layout;
    document.querySelector('.username').innerHTML=JSON.parse(localStorage.getItem("currentUser")).username;
    document.querySelector('.role-tag').innerHTML=JSON.parse(localStorage.getItem("currentUser")).role;
    }
const renderHomePage=()=>{
    loadLayout();
    const page=document.querySelector(".page");
    page.innerHTML="<div>Home</div>";
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
    
    if(currentPage==null){
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
    else {
        renderEmpty();
    }
}


renderCurrentPage();