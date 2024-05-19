export function loggedInEvents() {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    document.addEventListener('DOMContentLoaded', () => {
        const loggedIn = document.querySelector('.loggedIn-state');
        const loggedOut = document.querySelector('.loggedOut-state');
        const newPostButton = document.getElementById('newPost');

        if (userData) {
            // console.log('User is logged in', userData);
            loggedOut.style.display = 'flex'
            loggedIn.style.display = 'none'
            if ( window.location.href === 'index.html') {
                newPostButton.style.display = 'block';
            }
            
        } else {
            console.log('No user logged in');
            loggedIn.style.display = 'flex';
            loggedOut.style.display = 'none';
            if ( window.location.href === 'index.html') {
                newPostButton.style.display = 'none'
            }
        }
    }) 
} 

loggedInEvents();