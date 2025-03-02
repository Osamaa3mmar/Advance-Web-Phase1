
const message=(e)=>{
    e.preventDefault();
    console.log("message");
    const message=document.querySelector('.text-input');
    const messageHelper=JSON.parse(localStorage.getItem("messageHelper"));
    const newMsg={
        sender:messageHelper.current,
        recever:messageHelper.recever,
        content:message.value
    }
    const messages=JSON.parse(localStorage.getItem("messages"));
    if(messages){
        messages.push(newMsg);
        localStorage.setItem("messages",JSON.stringify(messages));

    }
    else{
        localStorage.setItem("messages",JSON.stringify([newMsg]))
    }
    message.value="";
    loadChat();
}

    const loadMessages=()=>{
        const messages=JSON.parse(localStorage.getItem("messages"));
        const messageHelper=JSON.parse(localStorage.getItem("messageHelper"));
        const tempChat=messages.filter((message)=>{
            return (messageHelper.current.id==message.sender.id ||messageHelper.current.id==message.recever.id) &&(messageHelper.recever.id==message.recever.id||messageHelper.recever.id==message.sender.id);
        })
        console.log(tempChat);
        const chatBox=document.querySelector(".messages");
        if(tempChat){
            chatBox.innerHTML=tempChat.map((message)=>{
                return `<div class="message ${message.sender.id==messageHelper.current.id?'sender':"recever"}">
        <p class="msg-name">${message.sender.username}</p>
        <p class="msg-content">${message.content}</p>
        </div>`
            }).join("")
        }
    };


const loadChat=()=>{
    const chatBox=document.querySelector(".chat-box");
    const chatAreaEmpty=document.querySelector(".chat-area .chat-box-start");
    const chatReceverName=document.querySelector(".message-info h3");
    const recever =JSON.parse(localStorage.getItem('messageHelper')).recever;
    chatAreaEmpty.classList.add('hide');
    chatBox.classList.remove('hide');
    chatReceverName.innerHTML=recever?recever.username:'';
    loadMessages();
}


const currentUser=(id)=>{
    const userList =document.querySelector(".user-list");
    const tempUsers=JSON.parse(localStorage.getItem('users'));
    const current=JSON.parse(localStorage.getItem("currentUser"));
    let recever=null;
    
    userList.innerHTML=`${tempUsers?tempUsers.map((user)=>{
        if(user.id!=JSON.parse(localStorage.getItem('currentUser')).id){
            user.id==id?recever=user:null;
            if(current.role=='admin')
        return`<li class="${user.id==id?"active-user-chat-btn":''}" onclick="currentUser(${user.id})">${user.username}</li>`;
            
            else if(user.role=='admin')
                return`<li class="${user.id==id?"active-user-chat-btn":''}" onclick="currentUser(${user.id})">${user.username}</li>`;

        }
    
    }).join(''):'Empty'}`;
    localStorage.setItem('messageHelper', JSON.stringify({current,recever}));
    loadChat();
}