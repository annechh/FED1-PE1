function createLoginForm() {
    let section = document.getElementById('loginSection');

    let h1 = document.createElement('h1');
    h1.innerText = 'Log In';

    let form = document.createElement('form');
    form.id = 'loginForm';
    
    let inputName = ['Email', 'Password']; 
    let inputId = ['loginEmail', 'loginPassword'];
    let inputType = ['text', 'password'];
    
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
    registerButton.innerText = 'Log In';
    registerButton.classList = 'btn';

    let changeToRegister = document.createElement('a');
    changeToRegister.innerText = 'Not a user? Register here';
    changeToRegister.href = '../account/register.html';

    btnContainer.append(registerButton, changeToRegister)
    section.append(h1, form, btnContainer);

    return section;
}

createLoginForm()