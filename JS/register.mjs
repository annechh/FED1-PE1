
function createRegisterForm() {
    let section = document.getElementById('registerSection');

    let h1 = document.createElement('h1');
    h1.innerHTML = 'Register User';

    let form = document.createElement('form');
    form.id = 'registerForm';
    
    let inputName = ['Name', 'Email', 'Password', 'Confirm Password']; 
    let inputId = ['registerName', 'registerEmail', 'registerPassword', 'registerConfirmPassword'];
    let inputType = ['text', 'text', 'password', 'password'];
    let passwordInput;
    
    for (let i = 0; i < inputName.length; i++) {
        let input = document.createElement('input');
        input.name = inputName[i];
        input.type = inputType[i];
        input.id = inputId[i];
        input.placeholder = inputName[i];
        input.required = true;

        if ( inputType[i] === 'text' && inputName[i] === 'Name') {
            input.minLength = 2;
        } else if (inputType[i] === 'text' && inputName[i] === 'Email') {
            input.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$';
            input.title = 'Enter a valid email address'
        } else if (inputType[i] === 'password') {
            input.pattern = '(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
            input.title = 'Password must contain at least one letter and one number';

            passwordInput = input; // Store a reference to the password input element
        } 
        
        form.appendChild(input);
    }

    document.addEventListener('DOMContentLoaded', function() {
        let confirmPasswordInput = document.getElementById('registerConfirmPassword');
            confirmPasswordInput.addEventListener('input', function() {
        let password = passwordInput.value;
        let confirmPassword = confirmPasswordInput.value;
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
            }
        })
    })

    let btnContainer = document.createElement('div');
    btnContainer.classList = 'btn-container';

    let registerButton = document.createElement('button');
    registerButton.type = 'submit';
    registerButton.innerText = 'Register User';
    registerButton.classList = 'btn';
    registerButton.addEventListener('click', () => {

    })

    let changeToLogin = document.createElement('a');
    changeToLogin.innerText = 'Already a user? Log in here';
    changeToLogin.href = '../account/login.html';

    btnContainer.append(registerButton, changeToLogin)
    section.append(h1, form, btnContainer);

    return section;
}

createRegisterForm()


function registerUser() {
    
}





console.log('hello');

// const eventConfirmPassword = () => {
//     let confirmPasswordInput = document.getElementById('registerConfirmPassword');
//     confirmPasswordInput.addEventListener('input', function() {
//     let password = passwordInput.value;
//     let confirmPassword = confirmPasswordInput.value;
//     if (password !== confirmPassword) {
//         alert('Passwords do not match!');
//     }
//     })
// }