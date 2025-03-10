function getData(){

    return{
        "projectCount":JSON.parse(localStorage.getItem("projects")).length,
        "StudentCount":JSON.parse(localStorage.getItem("users")).filter(user=>user.role!="admin").length,
        "TasksCount":JSON.parse(localStorage.getItem("Tasks")).length,
        "FinishedProjrctsCount":JSON.parse(localStorage.getItem("projects")).filter(t=>getPercent(t.title)==100).length
    }
}

 const fun1= ()=>{
    let data=getData();
    document.getElementById("Projects_count").innerText=data.projectCount;
    document.getElementById("Students_count").innerText=data.StudentCount;
    document.getElementById("Tasks_count").innerText=data.TasksCount;
    document.getElementById("Finished_Projects_count").innerText=data.FinishedProjrctsCount;
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar', // Type of chart
        data: {
            labels: ['projects','Students','Tasks','Finished Projects'], // X-axis labels
            datasets: [{
                label: 'Count', // Label for the dataset
                data: [data.projectCount,data.StudentCount,data.TasksCount,data.FinishedProjrctsCount], // Y-axis data
                backgroundColor: [
                    'rgba(41,63,62,255)',
                    'rgba(37,57,71,255)',
                    'rgba(75,65,42,255)',
                    'rgba(55,44,75,255)'
                   
                ],
                borderColor: [
                    'rgba(57,120,120,255)',
                    'rgba(50,127,181,255)',
                    'rgba(184,151,68,255)',
                    'rgba(104,73,167,255)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            // indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

};

