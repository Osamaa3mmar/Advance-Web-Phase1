
// signUpForm.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const newUser={
//         username:signUpUserNameInput.value,
//         password:signUpPasswordInput.value,
//         universityId:universityIdBox.checked?signUpUniversityId.value:'',
//         role:universityIdBox.checked?'student':'admin'
//     }
//     const users=JSON.parse(localStorage.getItem('users'));
//     if(!users){
//         localStorage.setItem("users",JSON.stringify([newUser]));
//     }
//     else{
//         const userId=users.find((user)=>{
//             return user.username===newUser.username;
//         })
//         if(userId){
//             console.log('object')
//         }
//         else{
//             users.push(newUser);
//             localStorage.setItem('users',JSON.stringify(users));
//         }
//     }
// })

const signUpSubmit=(e)=>{
    e.preventDefault();
    const universityIdBox=document.querySelector('.University-id-box')
    const signUpUserNameInput=document.querySelector('#username');
    const signUpPasswordInput=document.querySelector('#password');
    const signUpUniversityId=document.querySelector('#University-id');
    const clearSigUpInputs=()=>{
      signUpUserNameInput.value='';
      signUpPasswordInput.value='';
      universityIdBox.checked=false;
      universityIdBox.checked=false;
      signUpUniversityId.value='';
    }
    const newUser={
        username:signUpUserNameInput.value,
        password:signUpPasswordInput.value,
        universityId:universityIdBox.checked?signUpUniversityId.value:'',
        role:universityIdBox.checked?'student':'admin',
        color:Math.floor(Math.random() * 1000000),
        id:JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')).length+1:1,
    }
    const users=JSON.parse(localStorage.getItem('users'));
    if(!users){
      renderCurrentPage();
        localStorage.setItem("users",JSON.stringify([newUser]));
        clearSigUpInputs();
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
    }
    else{
        const userId=users.find((user)=>{
            return user.username===newUser.username;
        })
        if(userId){
            console.log('user allredy in system ');
           
              
              Toast.fire({
                icon: "error",
                title: "Something went wrong!"
              });
              
        }
        else{
            users.push(newUser);
            localStorage.setItem('users',JSON.stringify(users));
              clearSigUpInputs();
              renderCurrentPage();
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
        }
    }
}

const goToLoginPage=()=>{
    currentPage='login';
    renderCurrentPage();
}