import { loggedInEvents } from "./default.mjs";


export function indexHeader() {
    let header = document.querySelector('header')
    let firstChild = header.firstChild;

    let nav = document.createElement('nav');
        nav.classList.add('nav-absolute');
        if (window.location.href.includes('login.html') || window.location.href.includes('register.html')) {
            nav.className = '';
        }

    let img = document.createElement('img');
        img.alt = 'logo of a dog with text saying Shiras adventure';
        img.classList.add('hover-scale');
        img.src = 'assets/images/Shira-logo-text.png';
        img.addEventListener('click', () => {
            window.location.href = 'index.html';
        }) 

    let linkContainer = document.createElement('div');

    let home = document.createElement('a');
        home.classList.add('ds-txt', 'hover-scale');
        home.textContent = 'Home';
        home.href = '';

    let homeIcon = document.createElement('i');
        homeIcon.className = 'fa-solid fa-house';

    let login = document.createElement('a');
        login.classList.add('ds-txt', 'hover-scale', 'loggedIn-state');
        login.textContent = 'Login';
        login.href = 'account/login.html';

        
    let loginIcon = document.createElement('i');
        loginIcon.classList.add('fa-solid', 'fa-user', 'login-icon');

    let logout = document.createElement('a');
        logout.classList.add('ds-txt', 'hover-scale', 'loggedOut-state');
        logout.textContent ='Logout';
        logout.addEventListener('click', () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');
            logout.href = 'index.html';
            alert('You are now logged out');
        })

    let logoutIcon = document.createElement('i');
        logoutIcon.classList.add('fa-solid', 'fa-right-from-bracket');
    
    logout.appendChild(logoutIcon)
    login.appendChild(loginIcon);
    home.appendChild(homeIcon);
    linkContainer.append(home, login, logout)
    nav.append(img, linkContainer);
    header.insertBefore(nav, firstChild);
}

indexHeader();

loggedInEvents();


// const userDataString = localStorage.getItem('userData');
// const userData = JSON.parse(userDataString);


// document.addEventListener('DOMContentLoaded', () => {
//     const loggedIn = document.querySelector('.loggedOut-state');
//     const loggedOut = document.querySelector('.loggedIn-state');

//     if (userData) {
//         // console.log('User is logged in', userData);
//         loggedIn.style.display = 'flex';
//         loggedOut.style.display = 'none';

//     } else {
//         console.log('No user logged in');
//         loggedIn.style.display = 'none'
//         loggedOut.style.display = 'flex'
//     }
// })