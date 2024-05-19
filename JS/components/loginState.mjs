// import { welcomeUser } from "../index.mjs";





export function loggedInEvents() {
    const userData = getUserData()
    
    document.addEventListener('DOMContentLoaded', () => {
        const loggedIn = document.querySelector('.loggedOut-state');
        const loggedOut = document.querySelector('.loggedIn-state');
        const newPostButton = document.getElementById('newPost');

        if (userData) {
            // console.log('User is logged in', userData);
            loggedOut.style.display = 'flex'
            loggedIn.style.display = 'none'
            if ( window.location.href.includes('index.html')) {
                newPostButton.style.display = 'block';

                // const userName = userData.name;
                // welcomeUser(userName);
            }
            
        } else {
            console.log('No user logged in');
            loggedIn.style.display = 'flex';
            loggedOut.style.display = 'none';
            if ( window.location.href.includes('index.html')) {
                newPostButton.style.display = 'none'
            }
        }
    }) 
} 

loggedInEvents();


// export function getUserData() {
//     if ('userData') {
//     const userDataString = localStorage.getItem('userData');
//     const userData = JSON.parse(userDataString);
//     const userName = userData.name;
//     return userName;
//     }
// }

export function getUserData() {

    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    return userData;
}