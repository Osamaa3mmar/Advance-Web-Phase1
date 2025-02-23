const app=document.querySelector('.app');
let currentPage=localStorage.getItem('currentPage');
const osama=document.querySelector('.osama');






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
                <input required type="text" id="login-password">
            </div>
            <div class="select-box">
                <input type="checkbox" class="stay-signed"  id="stay-signed">
                <label for="stay-signed">Stay Signed In</label>
                
            </div>
            <input type="submit" class='auth-btn' value="Sign In">
            <p class="sign-up-btn-page" onclick="goToSignUpPage()">Dont have an account ? <span>signUp</span></p>
        </form>
    </div>`
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
                <input type="text" required id="password" name="password">
                
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
    app.innerHTML='';
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
    else {
        renderEmpty();
    }
}


renderCurrentPage();




