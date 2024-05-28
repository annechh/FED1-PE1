import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs"; 
import { loggedInEvents } from "../components/loginState.mjs";
import { fetchApi, loginUrl } from "../components/fetch.mjs";
import { checkIfEmptyField, emailValidation, passwordValidation } from "../components/validation.mjs";


function runLoginPage() {
    hideLoginAlert();
    createLoginForm();
}


function createLoginForm() {
    const section = document.getElementById('loginSection');

    const h1 = document.createElement('h1');
    h1.innerText = 'Log In';

    const form = document.createElement('form');
        form.id = 'loginForm';
        form.classList.add('gap','flex', 'flex-col', 'items-center');
        form.addEventListener('submit', loggedInEvents());

    const emailDiv = document.createElement('div');
        emailDiv.classList.add('form-div');

        const email = document.createElement('input');
            email.name = 'Email';
            email.type = 'text';
            email.id = 'loginEmail';
            email.placeholder = 'Email';
            email.required = true;

        const emailError = document.createElement('label');
            emailError.id = 'emailError';
            emailError.classList.add('error-message', 'hide');    

    const passwordDiv = document.createElement('div');
            passwordDiv.classList.add('form-div');

        const password = document.createElement('input');
            password.name = 'Password';
            password.type = 'password';
            password.id = 'loginPassword';
            password.placeholder = 'Password';
            password.required = true;

        const passwordError = document.createElement('label');
            passwordError.id = 'passwordError';
            passwordError.classList.add('error-message', 'hide');

    const btnContainer = document.createElement('div');
        btnContainer.classList = 'btn-container';

    const loginButton = document.createElement('button');
        loginButton.type = 'submit';
        loginButton.innerText = 'Log In';
        loginButton.classList = 'btn';
        loginButton.id = 'loginBtn';
        loginButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            handleLogin(); 
        });

    const changeToRegister = document.createElement('a');
    changeToRegister.innerText = 'Not a user? Register here';
    changeToRegister.href = '../account/register.html';

    btnContainer.append(loginButton, changeToRegister);
    passwordDiv.append(password, passwordError);
    emailDiv.append(email, emailError);
    form.append(emailDiv, passwordDiv, btnContainer)
    section.append(h1, form);

    return section;
}


async function fetchData() {    
    validateEmail() 
    validatePassword() 

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userData = await fetchApi('POST', loginUrl, { email, password });
    
    const accessToken = userData.data.accessToken;
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userData', JSON.stringify(userData.data));
            
            showLoginAlert();
            
            setTimeout(() => {
                hideLoginAlert();
                window.location.href = '../index.html';
            }, 2500);
        } else {
            console.error('No token found', userData);
            alert('Voffsies! could not find the Pawsome post');
        }
}


async function handleLogin() {
    validateEmail();
    validatePassword();

    const emailError = document.getElementById('emailError').textContent;
    const passwordError = document.getElementById('passwordError').textContent;

    if (emailError || passwordError) {
        return;
    }
    fetchData()
}


function validateEmail() {
    const email = document.getElementById('loginEmail').value;
    const emailError = document.getElementById('emailError');
    if (checkIfEmptyField(email, emailError)) return;
    emailValidation(email, emailError);
}

function validatePassword() {
    const password = document.getElementById('loginPassword').value;
    const passwordError = document.getElementById('passwordError');
    if (checkIfEmptyField(password, passwordError)) return;
    passwordValidation(password, passwordError); 
}


function showLoginAlert() {
    const loginAlert = document.getElementById('loginAlert');
    const logInForm = document.getElementById('loginSection');
    if (loginAlert) {
        loginAlert.style.display = 'block';
    }
    if ( logInForm) {
        logInForm.style.display = 'none';
    }
}

function hideLoginAlert() {
    const loginAlert = document.getElementById('loginAlert');
    if (loginAlert) {
        loginAlert.style.display = 'none';
    }
}


runLoginPage()