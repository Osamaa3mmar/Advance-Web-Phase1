let sortOrder = {}; // Store the sort order for each column

function sortTable(column) {
    const isAscending =true // Toggle sorting order
    sortOrder[column] = isAscending ? "asc" : "desc";

    tasks.sort((a, b) => {
let valA = a[column];
let valB = b[column];

if (column === "Due Date") {
            valA = new Date(valA);
            valB = new Date(valB);
        }

// Convert to lowercase for case-insensitive sorting
if (typeof valA === "string" && typeof valB === "string") {
    return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
}

return 0;
});
    let tableBody=document.querySelector("#taskTableBody")


    tableBody.innerHTML=randerTable(tasks)
}


function SortByHandler(event){
    // console.log(event.target.value)
    sortTable(event.target.value)
}