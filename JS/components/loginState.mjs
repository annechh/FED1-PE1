// import { welcomeUser } from "../index.mjs";





export function loggedInEvents() {
    const userData = getUserData()
    
    document.addEventListener('DOMContentLoaded', () => {
        const loggedIn = document.querySelector('.loggedOut-state');
        const loggedOut = document.querySelector('.loggedIn-state');
        const newPostButton = document.getElementById('newPost');
        const selectPostsButton = document.getElementById('selectPostsBtn')
        // const adminButtons = document.getElementById('editBtn', 'deleteBtn')

        if (userData) {
            // console.log('User is logged in', userData);
            loggedOut.style.display = 'flex';
            loggedIn.style.display = 'none';
            if (selectPostsButton) {
                selectPostsButton.style.display = 'flex';
            }
            if ( newPostButton ) {
                newPostButton.style.display = 'flex';
            }
            
        } else {
            console.log('No user logged in');
            loggedIn.style.display = 'flex';
            loggedOut.style.display = 'none';
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


export function getUserData() {

    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    
    return userData;
}