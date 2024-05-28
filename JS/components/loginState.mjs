export function loggedInEvents() {
    const userData = getUserData()
    
    document.addEventListener('DOMContentLoaded', () => {
        const loggedIn = document.querySelector('.loggedOut-state');
        const loggedOut = document.querySelector('.loggedIn-state');
        const newPostButton = document.getElementById('newPost');
        const selectPostsButton = document.getElementById('selectPostsBtn')
        const editBtn = document.getElementById('editBtn')
        const deleteBtn = document.getElementById('deletePostBtn')

        if (userData) {
            loggedOut.style.display = 'flex';
            loggedIn.style.display = 'none';
            
            if (editBtn) {
                editBtn.style.display = 'flex';
            }
            if (deleteBtn) {
                deleteBtn.style.display = 'flex';
            }
            if (selectPostsButton) {
                selectPostsButton.style.display = 'flex';
            }
            if ( newPostButton ) {
                newPostButton.style.display = 'flex';
            }
            
        } else {
            // console.log('No user logged in');
            loggedIn.style.display = 'flex';
            loggedOut.style.display = 'none';
            if (editBtn) {
                editBtn.style.display = 'none';
            }
            if (deleteBtn) {
                deleteBtn.style.display = 'none';
            }
            if (selectPostsButton) {
                selectPostsButton.style.display = 'none';
            }
            if ( newPostButton ) {
                newPostButton.style.display = 'none'
            }
        }
    }) 
} 

loggedInEvents();


export function getUserData(adminName) {

    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    adminName = 'Shira';
    // console.log('user data from log in state', userData);
    
    return userData;
}

export function accessDenied(){
    if (!getUserData()) {
        alert('No authorization to use this page, log in');
        window.location.href = '../account/login.html'
        return;
    }
}

export function checkForAdmin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const adminName = userData.name;
    return adminName === 'Shira';
}