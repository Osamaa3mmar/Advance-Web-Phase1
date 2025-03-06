function resetForm(){
    document.getElementById('taskName').value=''
    document.getElementById('description').value=''
    document.getElementById('dueDate').value=''
    
}

function fetch_projects(){

    return localStorage.getItem("projects")
    
}
function fetch_users(){
    return localStorage.getItem("users")
}
  
function init_project_list(){
    document.querySelector("#project").innerHTML=""
    let project_list=JSON.parse(fetch_projects());
    
    for(let i=0;i<project_list.length;i++){
        // console.log(project_list[i])
        document.querySelector("#project").innerHTML+=`
        <option value=${i} >${project_list[i].title
        } </option>
    `
    }
    
}


function init_users_list(i){
    
    if(i==undefined)
        return
    let project_list=JSON.parse(fetch_projects());
    
    console.log(i)
    let users=project_list[i].students
   
    console.log(users)
        document.querySelector("#assigned").innerHTML=""
        // let user_list=JSON.parse(fetch_users());
        
        
        for(let i=0;i<users.length;i++){
            document.querySelector("#assigned").innerHTML+=`
            <option value=${users[i]} >${users[i] } </option>
        `
        }
        
    
}
function openModal(){
    init_project_list();
    init_users_list(0);

    document.querySelector
    const modal = document.getElementById('taskModal');
    modal.style.display='flex';
}

function closeModal(){
    const modal = document.getElementById('taskModal');
    modal.style.display='none';
}

// Close modal when clicking outside
function saveTask() {
        let project_list=JSON.parse(fetch_projects());
        let val=document.getElementById('project').value
         let new_task=build_task({
        id:tasks.length+1,
        project:project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "pending",
        dueDate: document.getElementById('dueDate').value
    });
    let tableBody=document.querySelector("#taskTableBody")

    tableBody.innerHTML+=new_task.outerHTML
    
    tasks.push({
        id:tasks.length+1,
        project:project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "Pending",
        dueDate: document.getElementById('dueDate').value
    })


    commit_tasks(tasks)
        closeModal();
        resetForm();
    }
