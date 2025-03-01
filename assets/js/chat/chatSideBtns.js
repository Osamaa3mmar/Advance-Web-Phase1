



const currentUser=(id)=>{
    const userList =document.querySelector(".user-list");
    const tempUsers=JSON.parse(localStorage.getItem('users'));

    userList.innerHTML=`${tempUsers?tempUsers.map((user)=>{
        if(user.id!=JSON.parse(localStorage.getItem('currentUser')).id)
        return`<li class="${user.id==id?"active-user-chat-btn":''}" onclick="currentUser(${user.id})">${user.username}</li>`
    }).join(''):'Empty'}`;
    console.log(id)
}