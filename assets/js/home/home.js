function getData(){

    return{
        "projectCount":12,
        "StudentCount":19,
        "TasksCount":3,
        "FinishedProjrctsCount":5
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
    let d=new Date();
    const options = {
  weekday: 'long', // Full day name (e.g., "Saturday")
  year: 'numeric', // Full year (e.g., "2025")
  month: 'long',   // Full month name (e.g., "February")
  day: 'numeric',  // Day of the month (e.g., "22")
  hour: 'numeric', // Hour (e.g., "5")
  minute: 'numeric', // Minute (e.g., "15")
  second: 'numeric', // Second (e.g., "27")
  hour12: true,    // Use 12-hour format (e.g., "PM")
};

const formatter = new Intl.DateTimeFormat('en-US', options);
const formattedDate = formatter.format(d);

    document.getElementById("date").innerHTML=formattedDate;
    // `${dayofWeek[d.getDay()]},${d.getUTCMonth()} ${d.getUTCDay()},${d.getUTCFullYear()} at ${d.getUTCHours()}: ${d.getUTCMinutes()}: ${d.getUTCSeconds()} `


};

