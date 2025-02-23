

// universityIdBox.addEventListener('change',()=>{
//     if(universityIdBox.checked){
//         universityIdContainer.style.display='block';
//         universityIdInput.required=true;
//     }
//     else{
//         universityIdInput.required=false;

//         universityIdContainer.style.display='none';
//     }
// })


const universityStudent=()=>{
    const universityIdBox=document.querySelector('.University-id-box');
const universityIdContainer=document.querySelector('.university-id-container');
const universityIdInput=document.querySelector('#University-id');
    if(universityIdBox.checked){
        universityIdContainer.style.display='flex';
        universityIdInput.required=true;
    }
    else{
        universityIdInput.required=false;

        universityIdContainer.style.display='none';
    }
}