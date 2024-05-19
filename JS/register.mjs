import { fontawsomeScript } from "./components/default.mjs";
import { createHeader } from "./components/header.mjs"; 
import { loggedInEvents } from "./components/loginState.mjs";




// Name: pattern: ^[\w]+$
//       maxLength: 20
// Email: ^[\w\-.]+@(stud\.)?noroff\.no$  
// Password:  minLength: 8

function createRegisterForm() {
    let section = document.getElementById('registerSection');

    let h1 = document.createElement('h1');
    h1.innerHTML = 'Register User';

    let form = document.createElement('form');
    form.id = 'registerForm';
    
    let name = document.createElement('input');
    name.name = 'Name';
    name.type = 'text';
    name.id = 'registerName';
    name.placeholder = 'Name';
    name.required = true;

    let email = document.createElement('input');
    email.name = 'Email';
    email.type = 'text';
    email.id = 'registerEmail';
    email.placeholder = 'Email';
    email.required = true;

    let password = document.createElement('input');
    password.name = 'Password';
    password.type = 'password';
    password.id = 'registerPassword';
    password.placeholder = 'Password';
    password.required = true;

    let confirmPassword = document.createElement('input');
    confirmPassword.name = 'Confirm Password';
    confirmPassword.type = 'password';
    confirmPassword.id = 'registerConfirmPassword';
    confirmPassword.placeholder = 'Confirm Password';
    confirmPassword.required = true;

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
    form.append(name, email, password, confirmPassword, btnContainer);
    section.append(h1, form);

    return section;
}

createRegisterForm()




async function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Password do not match');
        return;
    }

    const createUser = {
        name: name,
        email: email,
        password: password,
    }

    await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(createUser),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Response failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data logs: ', data);
        alert('Successful registration')
    })
    .catch(error => {
        console.error('There was a problem with the registration', error);
        alert('Registration failed, please try again later')
    })
}






