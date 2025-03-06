
function fetch_tasks() {
    const tasks = localStorage.getItem("Tasks");
   let task= tasks ? JSON.parse(tasks) : []; // Return an empty array if null
   let currStu=JSON.parse(localStorage.getItem("currentUser"))
   if(currStu.role!="admin")
    task=task.filter(t=>t.assigned==currStu.username)
   return task;
}

function commit_tasks(tasks) {
    if(tasks==undefined)
         tasks = [
            {
                id: 1,
                project: "Website Redesign",
                taskName: "Design Homepage",
                description: "Create a responsive design for the homepage.",
                assigned: "Ali Yaseen",
                status: "In Progress",
                dueDate: "4/22/2023"
            },
            {
                id: 2,
                project: "Website Redesign",
                taskName: "Develop API",
                description: "Set up the backend API for the project.",
                assigned: "Braa Aeesh",
                status: "Completed",
                dueDate: "1/16/2023"
            },
            {
                id: 3,
                project: "Mobile App Development",
                taskName: "Write Documentation",
                description: "Document the project setup and usage.",
                assigned: "Ibn Al-Jawzee",
                status: "Pending",
                dueDate: "3/15/2023"
            },
            {
                id: 4,
                project: "Mobile App Development",
                taskName: "Testing",
                description: "Conduct testing for all features.",
                assigned: "Ibn Malik",
                status: "In Progress",
                dueDate: "11/29/2023"
            },
            {
                id: 5,
                project: "E-commerce Platform",
                taskName: "Deploy Application",
                description: "Deploy the application to the production server.",
                assigned: "Ayman Outom",
                status: "Pending",
                dueDate: "3/24/2023"
            }
        ];
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
console.log(tasks)
console.log(btn)


tasks[btn.getAttribute("order")].status=btn.innerHTML
console.log(btn.getAttribute("order"))
console.log(tasks[btn.getAttribute("order")])

commit_tasks(tasks)
       
}


// commit_tasks()