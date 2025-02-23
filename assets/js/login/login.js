const login=(e)=>{
    e.preventDefault();
    const loginPasswordInput=document.querySelector('#login-password');
    const loginUsernameInput=document.querySelector('#login-username');
    const users=JSON.parse(localStorage.getItem('users'));
    if(!users){
        console.log("no User is in the system");
    }
    else{
        const id=users.find((user)=>{
            return user.username===loginUsernameInput.value ;
        })
        if(id){
            if(id.password==loginPasswordInput.value){
                currentPage='main';
                renderCurrentPage();
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: "#333",  // Dark background
                    color: "#fff",       // White text
                    iconColor: "#0f0",   // Green success icon color
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Signed in successfully !"
                  });
            }
            else{
                       
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: "#000",  // Dark background
                color: "#fff",       // White text
                iconColor: "#ff4d4d", // Red color for error icon
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              
              Toast.fire({
                icon: "error",
                title: "Wrong Password !"
              });
            }
        }
        else{
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: "#000",  // Dark background
                color: "#fff",       // White text
                iconColor: "#ff4d4d", // Red color for error icon
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              
              Toast.fire({
                icon: "error",
                title: "User Not Found !"
              });
            
        }
    }
}


const goToSignUpPage=()=>{
    currentPage='signup';
    renderCurrentPage();

}