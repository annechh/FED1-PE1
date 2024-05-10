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
        img.src = '../assets/images/Shira-logo-text.png';
        img.addEventListener('click', () => {
            window.location.href = 'index.html';
        }) 

    let linkContainer = document.createElement('div');

    let home = document.createElement('a');
        home.className = 'ds-txt hover-scale';
        home.textContent = 'Home';
        home.href = '';

    let homeIcon = document.createElement('i');
        homeIcon.className = 'fa-solid fa-house';

    let login = document.createElement('a');
        login.className = 'ds-txt hover-scale';
        login.textContent = 'Login';
        login.addEventListener( 'click', () => {
            window.location.href = 'account/login.html';
        })
        
    let loginIcon = document.createElement('i');
        loginIcon.className = 'fa-solid fa-user login-icon';

    login.appendChild(loginIcon);
    home.appendChild(homeIcon);
    linkContainer.append(home, login)
    nav.append(img, linkContainer);
    header.insertBefore(nav, firstChild);
}

indexHeader();