
export function createHeader() {
    let header = document.querySelector('header')
    let firstChild = header.firstChild;

    let nav = document.createElement('nav');
        nav.classList.add('nav-absolute');

    let img = document.createElement('img');
        img.src = '../assets/images/Shira-logo-text.png';
        img.alt = 'logo of a dog with text saying Shiras adventure';
        img.classList.add('hover-scale');
        img.addEventListener('click', () => {
            window.location.href = '../index.html';
        }) 

    let linkContainer = document.createElement('div');

    let home = document.createElement('a');
        home.href = '../index.html';
        home.className = 'ds-txt hover-scale';
        home.textContent = 'Home';

    let homeIcon = document.createElement('i');
        homeIcon.className = 'fa-solid fa-house';

    let login = document.createElement('a');
        login.href = '../account/login.html';
        login.className = 'ds-txt hover-scale';
        login.textContent = 'Login';

    let loginIcon = document.createElement('i');
        loginIcon.className = 'fa-solid fa-user login-icon';

    login.appendChild(loginIcon);
    home.appendChild(homeIcon);
    linkContainer.append(home, login)
    nav.append(img, linkContainer);
    header.insertBefore(nav, firstChild);
}

createHeader()