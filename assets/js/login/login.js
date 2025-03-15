




const login=(e)=>{
    e.preventDefault();
    const loginPasswordInput=document.querySelector('#login-password');
    const loginUsernameInput=document.querySelector('#login-username');
    const users=JSON.parse(localStorage.getItem('users'));
    const staySign=document.querySelector('.stay-signed').checked;
    JSON.stringify(localStorage.setItem("stay",staySign));
    if(!users){
     
      
        
        Toast.fire({
          icon: "error",
          title: "User Not Found !"
        });
      
    }
    else{
        const currentUser=users.find((user)=>{
            return user.username===loginUsernameInput.value ;
        })
        if(currentUser){
            if(currentUser.password==loginPasswordInput.value){
              localStorage.setItem('currentUser',JSON.stringify(currentUser));
                currentPage='home';
                renderCurrentPage();
                  Toast.fire({
                    icon: "success",
                    title: "Signed in successfully !"
                  });
                  console.log(currentUser);
            }
            else{
              
              Toast.fire({
                icon: "error",
                title: "Wrong Password !"
              });
            }
        }
        else{
           
              
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