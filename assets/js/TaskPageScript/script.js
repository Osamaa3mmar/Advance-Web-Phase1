let tableBody=document.querySelector("#taskTableBody")
let tasks=fetch_tasks()
const taskJSON = localStorage.getItem("Tasks");
let globalTask= taskJSON ? JSON.parse(taskJSON) : [];
let tasks_count=0



function BuildPage(){
    let tableBody=document.querySelector("#taskTableBody")
    tableBody.innerHTML=randerTable(fetch_tasks())
}

function randerTable(tasks){
    let div=document.createElement("div")
    div.innerHTML=""
    tasks.forEach(element => {
        div.appendChild(build_task(element))

    });
    return div.innerHTML
}

console.log("globalTask:",globalTask)

//BuildPage()