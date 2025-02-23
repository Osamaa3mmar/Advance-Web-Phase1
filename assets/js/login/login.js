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
                console.log("loged")
            }
            else{
                console.log('wrong password')
            }
        }
        else{
            console.log("user not found !");
        }
    }
}


const goToSignUpPage=()=>{
    currentPage='signup';
    renderCurrentPage();

}