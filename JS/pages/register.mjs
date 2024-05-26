import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs"; 
import { loggedInEvents } from "../components/loginState.mjs";
import { fetchApi, registerUrl } from "../fetch.mjs";
import { 
    checkIfEmptyField, 
    nameValidation, 
    emailValidation, 
    passwordValidation, 
    confirmPasswordValidation } from "../components/validation.mjs";



function runRegisterPage() {

createRegisterForm();
hideRegisterAlert();
}



function createRegisterForm() {
    const section = document.getElementById('registerSection');

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Register User';

    const form = document.createElement('form');
    form.id = 'registerForm';

    const nameDiv = document.createElement('div');
        nameDiv.classList.add('form-div')
    
        const name = document.createElement('input');
            name.name = 'Name';
            name.type = 'text';
            name.id = 'registerName';
            name.placeholder = 'Name';
            name.required = true;

        const nameError = document.createElement('label');
            nameError.id = 'nameError';
            nameError.classList.add('error-message', 'hide', 'pl');
    
    const emailDiv = document.createElement('div');
        emailDiv.classList.add('form-div')

        const email = document.createElement('input');
            email.name = 'Email';
            email.type = 'text';
            email.id = 'registerEmail';
            email.placeholder = 'Email';
            email.required = true;

        const emailError = document.createElement('label');
            emailError.id = 'emailError';
            emailError.classList.add('error-message', 'hide', 'pl');
    
    const passwordDiv = document.createElement('div');
        passwordDiv.classList.add('form-div')

        const password = document.createElement('input');
            password.name = 'Password';
            password.type = 'password';
            password.id = 'registerPassword';
            password.placeholder = 'Password';
            password.required = true;

        const passwordError = document.createElement('label');
            passwordError.id = 'passwordError';
            passwordError.classList.add('error-message', 'hide', 'pl');

    const confirmPassDiv = document.createElement('div');
        confirmPassDiv.classList.add('form-div')

        const confirmPassword = document.createElement('input');
            confirmPassword.name = 'Confirm Password';
            confirmPassword.type = 'password';
            confirmPassword.id = 'registerConfirmPassword';
            confirmPassword.placeholder = 'Confirm Password';
            confirmPassword.required = true;

        const confirmPassError = document.createElement('label');
            confirmPassError.id = 'confirmPasswordError';
            confirmPassError.classList.add('error-message', 'hide', 'pl');
    

    const btnContainer = document.createElement('div');
        btnContainer.classList = 'btn-container';

    const registerButton = document.createElement('button');
        registerButton.type = 'submit';
        registerButton.innerText = 'Register User';
        registerButton.classList = 'btn';
        registerButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        handleRegister(); 
    });

    const changeToLogin = document.createElement('a');
        changeToLogin.innerText = 'Already a user? Log in here';
        changeToLogin.href = '../account/login.html';

    btnContainer.append(registerButton, changeToLogin);
    confirmPassDiv.append(confirmPassword, confirmPassError)
    passwordDiv.append(password, passwordError)
    emailDiv.append(email, emailError)
    nameDiv.append(name, nameError)
    form.append(nameDiv, emailDiv, passwordDiv, confirmPassDiv, btnContainer);
    section.append(h1, form);

    return section;
}


async function fetchData() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const data = await fetchApi('POST', registerUrl, { name, email, password });
        if (data) {
            showRegisterAlert();
            setTimeout(() => {
                hideRegisterAlert();
                window.location.href = '../account/login.html';
            }, 2500);
        }
    } catch (error) {
        console.error('Registration failed', error);
    }
}


async function handleRegister() {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    const nameError = document.getElementById('nameError').textContent;
    const emailError = document.getElementById('emailError').textContent;
    const passwordError = document.getElementById('passwordError').textContent;
    const confirmPasswordError = document.getElementById('confirmPasswordError').textContent;

    if (nameError || emailError || passwordError || confirmPasswordError) {
        return;
    }
    fetchData()
}


function validateName() {
    const name = document.getElementById('registerName').value;
    const nameError = document.getElementById('nameError');
    if (checkIfEmptyField(name, nameError)) return;
    nameValidation(name, nameError)
}

function validateEmail() {
    const email = document.getElementById('registerEmail').value;
    const emailError = document.getElementById('emailError');
    if (checkIfEmptyField(email, emailError)) return;
    emailValidation(email, emailError);
}

function validatePassword() {
    const password = document.getElementById('registerPassword').value;
    const passwordError = document.getElementById('passwordError');
    if (checkIfEmptyField(password, passwordError)) return;
    passwordValidation(password, passwordError); 
}

function validateConfirmPassword() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const confirmPassError = document.getElementById('confirmPasswordError');
    if (checkIfEmptyField(confirmPassword, confirmPassError )) return;
    confirmPasswordValidation(password, confirmPassword, confirmPassError);
}


function showRegisterAlert() {
    const registerAlert = document.getElementById('registerAlert');
    const registerForm = document.getElementById('registerSection');
    if (registerAlert) {
        registerAlert.style.display = 'block';
    }
    if ( registerForm) {
        registerForm.style.display = 'none';
    };
};

function hideRegisterAlert() {
    const registerAlert = document.getElementById('registerAlert');
    if (registerAlert) {
        registerAlert.style.display = 'none';
    };
};


runRegisterPage()