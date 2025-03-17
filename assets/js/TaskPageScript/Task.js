function fetch_tasks() {
    const tasks = localStorage.getItem("Tasks");
   let task= tasks ? JSON.parse(tasks) : []; // Return an empty array if null
   let currStu=JSON.parse(localStorage.getItem("currentUser"))
   if(currStu != null && currStu.role!="admin")
    task=task.filter(t=>t.assigned==currStu.username)
   return task;
}

function commit_tasks(tasks) {

    localStorage.setItem("Tasks", JSON.stringify(tasks)); // Convert to JSON before storing
}


 function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'pending':
            return 'status-pending';
        case 'completed':
            return 'status-completed';
        case 'in progress':
            return 'status-progress';
        default:
            return '';
    }
}


 function build_task(line){

    let tr=document.createElement("tr")

    
 
// let tdstatus=document.createElement("td")
let status=document.createElement("button")


status.classList.add("status")
status.classList.add(getStatusClass(line.status))
status.setAttribute("order",line.id-1)
    status.onclick=()=>{
        statusHandler(this);
        tasks[line.id].status=this.innerText
    }

    



status.innerText=line.status

tr.innerHTML=`
<td class="task-id">${line.id}</td>
<td>${line.project}</td>
<td>${line.taskName}</td>
<td>${line.description}</td>
<td>${line.assigned}</td>
<td onclick="statusHandler(this.children[0])"> ${status.outerHTML}</td>
<td>${line.dueDate}</td>
`

   

    return tr
}



 function statusHandler(btn){
 switch(btn.innerText)
        {
            case "Pending":
            btn.classList.remove(getStatusClass(btn.innerText))
            btn.classList.add(getStatusClass("In Progress"))
            btn.innerText="In Progress"    
            break;

            case "In Progress":  btn.classList.remove(getStatusClass(btn.innerText))
            btn.classList.add(getStatusClass("Completed"))
            btn.innerText="Completed"   
            break;

             case "Completed": 
              btn.classList.remove(getStatusClass(btn.innerText))
            btn.classList.add(getStatusClass("Pending"))
            btn.innerText="Pending"   
            break;
        }
        console.log("--------btn",btn.getAttribute("order") )
        console.log("--------tasks",globalTask[btn.getAttribute("order")] )
// tasks[btn.getAttribute("order")].status=btn.innerHTML;

globalTask[btn.getAttribute("order")].status=btn.innerHTML;


commit_tasks(globalTask)
       
}


// commit_tasks()