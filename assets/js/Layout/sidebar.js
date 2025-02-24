const toggleSideBar=()=>{
    document.querySelector('.sidebar').classList.toggle('collapse-sidebar');
    document.querySelector('.cret').classList.toggle('fa-caret-left');
    document.querySelector('.cret').classList.toggle('fa-caret-right');
}



const goToPages=(pageName)=>{
    currentPage=pageName?pageName:'';
    renderCurrentPage();
}