const logout=()=>{
    localStorage.removeItem("currentUser");
    currentPage='login';
    renderCurrentPage();
}