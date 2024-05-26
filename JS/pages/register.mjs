import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs"; 
import { loggedInEvents } from "../components/loginState.mjs";
import { fetchApi, registerUrl } from "../fetch.mjs";
import { checkIfEmptyField } from "../components/validation.mjs";



function createRegisterForm() {
    let section = document.getElementById('registerSection');

    let h1 = document.createElement('h1');
    h1.innerHTML = 'Register User';

    let form = document.createElement('form');
    form.id = 'registerForm';

    let nameDiv = document.createElement('div');
        nameDiv.classList.add('form-div')
    
        let name = document.createElement('input');
        name.name = 'Name';
        name.type = 'text';
        name.id = 'registerName';
        name.placeholder = 'Name';
        name.required = true;

        let nameError = document.createElement('label');
            nameError.id = 'nameError';
            nameError.classList.add('error-message', 'hide', 'pl');
    
    let emailDiv = document.createElement('div');
        emailDiv.classList.add('form-div')

        let email = document.createElement('input');
        email.name = 'Email';
        email.type = 'text';
        email.id = 'registerEmail';
        email.placeholder = 'Email';
        email.required = true;

        let emailError = document.createElement('label');
            emailError.id = 'emailError';
            emailError.classList.add('error-message', 'hide', 'pl');
    
    let passwordDiv = document.createElement('div');
        passwordDiv.classList.add('form-div')

        let password = document.createElement('input');
        password.name = 'Password';
        password.type = 'password';
        password.id = 'registerPassword';
        password.placeholder = 'Password';
        password.required = true;

        let passwordError = document.createElement('label');
            passwordError.id = 'passwordError';
            passwordError.classList.add('error-message', 'hide', 'pl');

    let confirmPassDiv = document.createElement('div');
        confirmPassDiv.classList.add('form-div')

        let confirmPassword = document.createElement('input');
        confirmPassword.name = 'Confirm Password';
        confirmPassword.type = 'password';
        confirmPassword.id = 'registerConfirmPassword';
        confirmPassword.placeholder = 'Confirm Password';
        confirmPassword.required = true;

        let confirmPassError = document.createElement('label');
            confirmPassError.id = 'confirmPasswordError';
            confirmPassError.classList.add('error-message', 'hide', 'pl');
    

    let btnContainer = document.createElement('div');
    btnContainer.classList = 'btn-container';

    let registerButton = document.createElement('button');
    registerButton.type = 'submit';
    registerButton.innerText = 'Register User';
    registerButton.classList = 'btn';
    registerButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        handleRegister(); 
        // Create or notify registered user, and redirect to login page
    });

    let changeToLogin = document.createElement('a');
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

createRegisterForm();





function validateName() {
    const name = document.getElementById('registerName').value;
    const nameError = document.getElementById('nameError');
    if (checkIfEmptyField(name, nameError)) return;

    const namePrefix = /^[\w]{1,20}$/;
    if (!namePrefix.test(name)) {
        nameError.textContent = 'Username can only contain letters, numbers, and underscores.';
        nameError.classList.add('show');
    } else {
        nameError.textContent = '';
        nameError.classList.remove('show');
    }
}

function validateEmail() {
    const email = document.getElementById('registerEmail').value;
    const emailError = document.getElementById('emailError');
    if (checkIfEmptyField(email, emailError)) return;

    const emailPrefix = /^[\w\-.]+@(stud\.)?noroff\.no$/;
    if (!emailPrefix.test(email)) {
        emailError.textContent = 'Not a valid email address. Must contain @stud.noroff.no.';
        emailError.classList.add('show');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('show');
    }
}

function validatePassword() {
    const password = document.getElementById('registerPassword').value;
    const passwordError = document.getElementById('passwordError');
    if (checkIfEmptyField(password, passwordError)) return;

    if (password.length < 8) {
        passwordError.textContent = 'Password needs to be at least 8 characters.';
        passwordError.classList.add('show');
    } else {
        passwordError.textContent = '';
        passwordError.classList.remove('show');
    }
}

function validateConfirmPassword() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const confirmPassError = document.getElementById('confirmPasswordError');
    if (checkIfEmptyField(confirmPassword, confirmPassError )) return;

    if (password !== confirmPassword) {
        confirmPassError.textContent = 'Passwords do not match. Please try again';
        confirmPassError.classList.add('show');
    } else {
        confirmPassError.textContent = '';
        confirmPassError.classList.remove('show');
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

hideRegisterAlert();


