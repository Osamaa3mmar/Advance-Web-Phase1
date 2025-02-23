
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
    const newUser={
        username:signUpUserNameInput.value,
        password:signUpPasswordInput.value,
        universityId:universityIdBox.checked?signUpUniversityId.value:'',
        role:universityIdBox.checked?'student':'admin'
    }
    const users=JSON.parse(localStorage.getItem('users'));
    if(!users){
        localStorage.setItem("users",JSON.stringify([newUser]));
    }
    else{
        const userId=users.find((user)=>{
            return user.username===newUser.username;
        })
        if(userId){
            console.log('user allredy in system ');
        }
        else{
            users.push(newUser);
            localStorage.setItem('users',JSON.stringify(users));
        }
    }
}

const goToLoginPage=()=>{
    currentPage='login';
    renderCurrentPage();
}