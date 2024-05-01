
function createRegisterForm() {
    let section = document.getElementById('registerSection');

    let h1 = document.createElement('h1');
    h1.innerText = 'Register User';

    let form = document.createElement('form');
    form.id = 'registerForm';
    
    let inputName = ['Name', 'Email', 'Password', 'Confirm Password']; 
    let inputId = ['registerName', 'registerEmail', 'registerPassword', 'registerConfirmPassword'];
    let inputType = ['text', 'text', 'password', 'password'];
    
    for (let i = 0; i < inputName.length; i++) {
        let input = document.createElement('input');
        input.name = inputType[i];
        input.type = inputName[i];
        input.id = inputId[i];
        input.placeholder = inputName[i];
        
        form.appendChild(input);
    }

    let btnContainer = document.createElement('div');
    btnContainer.classList = 'btn-container';

    let registerButton = document.createElement('button');
    registerButton.type = 'submit';
    registerButton.innerText = 'Register User';
    registerButton.classList = 'btn';

    let changeToLogin = document.createElement('a');
    changeToLogin.innerText = 'Already a user? Log in here';
    changeToLogin.href = '../account/login.html';

    btnContainer.append(registerButton, changeToLogin)
    section.append(h1, form, btnContainer);

    return section;
}

createRegisterForm()






console.log('hello');