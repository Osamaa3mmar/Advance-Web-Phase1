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
    
    let currStu=JSON.parse(localStorage.getItem("currentUser"))

        let project_list=JSON.parse(fetch_projects());
        project_list=project_list.filter((project)=>{return currStu.role=="admin"||project.students.includes(currStu.username)})
        
    for(let i=0;i<project_list.length;i++){
        document.querySelector("#project").innerHTML+=`
        <option value=${i} >${project_list[i].title
        } </option>
    `
    }
    
}


function init_users_list(i){
    let currStu=JSON.parse(localStorage.getItem("currentUser"))

    if(i==undefined)
        return
    let project_list=JSON.parse(fetch_projects());
    
    let users=currStu.role=="admin"?project_list[i].students:[currStu.username]
    
        document.querySelector("#assigned").innerHTML=""
        
        
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
    let currStu=JSON.parse(localStorage.getItem("currentUser"))

        let project_list=JSON.parse(fetch_projects());
        project_list = project_list.filter((project)=>currStu.role=="admin"||project.students.includes(currStu.username))
        let val=document.getElementById('project').value
         let new_task=build_task({
        id:tasks.length+1,
        project:project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "Pending",
        dueDate: document.getElementById('dueDate').value
    });
    let tableBody=document.querySelector("#taskTableBody")



    tableBody.innerHTML+=new_task.outerHTML
    
    globalTask.push({
        id:globalTask.length+1,
        project:project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "Pending",
        dueDate: document.getElementById('dueDate').value
    })

    tasks.push({
        id:globalTask.length,
        project:project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "Pending",
        dueDate: document.getElementById('dueDate').value
    })


    commit_tasks(globalTask)
        closeModal();
        resetForm();
    }
