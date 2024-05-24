import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs"; 
import { loggedInEvents } from "../components/loginState.mjs";
import { fetchApi, loginUrl } from "../fetch.mjs";



function createLoginForm() {
    let section = document.getElementById('loginSection');

    let h1 = document.createElement('h1');
    h1.innerText = 'Log In';

    let form = document.createElement('form');
    form.id = 'loginForm';
    form.addEventListener('submit', handleLogin, loggedInEvents());

    let email = document.createElement('input');
    email.name = 'Email';
    email.type = 'text';
    email.id = 'loginEmail';
    email.placeholder = 'Email';
    email.required = true;

    let password = document.createElement('input');
    password.name = 'Password';
    password.type = 'password';
    password.id = 'loginPassword';
    password.placeholder = 'Password';
    password.required = true;

    let btnContainer = document.createElement('div');
    btnContainer.classList = 'btn-container';

    let loginButton = document.createElement('button');
    loginButton.type = 'submit';
    loginButton.innerText = 'Log In';
    loginButton.classList = 'btn';
    loginButton.id = 'loginBtn'

    let changeToRegister = document.createElement('a');
    changeToRegister.innerText = 'Not a user? Register here';
    changeToRegister.href = '../account/register.html';

    btnContainer.append(loginButton, changeToRegister);
    form.append(email, password, btnContainer)
    section.append(h1, form);

    return section;
}

createLoginForm()



async function handleLogin(event) {
    event.preventDefault(); 

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
        const userData = await fetchApi('POST', loginUrl, { email, password });
        console.log('Login successful:', userData);
        const accessToken = userData.data.accessToken;
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userData', JSON.stringify(userData.data));
            console.log('Token saved to local storage', accessToken);
            
            showCustomAlert();
            
            setTimeout(() => {
                hideCustomAlert();
                window.location.href = '../index.html';
            }, 3000);
        } else {
            console.error('No token found', userData);
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
}


function showCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    const logInForm = document.getElementById('loginSection');
    if (customAlert) {
        customAlert.style.display = 'block';
    }
    if ( logInForm) {
        logInForm.style.display = 'none';
    }
}

function hideCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    if (customAlert) {
        customAlert.style.display = 'none';
    }
}
hideCustomAlert()
