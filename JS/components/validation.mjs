

export function checkIfEmptyField(fieldValue, errorMessageElement) {
    if (!fieldValue) {
        errorMessageElement.textContent = 'This field cannot be empty, please fill out.';
        errorMessageElement.classList.add('show');
        return true;
    } else {
        errorMessageElement.textContent = '';
        errorMessageElement.classList.remove('show');
        return false;
    }
}

export function nameValidation(name, nameError) {
    const namePrefix = /^[\w]{1,20}$/;
    if (!namePrefix.test(name)) {
        nameError.textContent = 'Username can only contain letters, numbers, and underscores.';
        nameError.classList.add('show');
        return false;
    } else {
        nameError.textContent = '';
        nameError.classList.remove('show');
        return true;
    }
}

// export function nameValidation(nameValue, error) {
//     const namePrefix = /^[\w]{1,20}$/;
//     const nameError = textContent;
//     if (!namePrefix.test(name)) {
//         nameError.textContent = 'Username can only contain letters, numbers, and underscores.';
//         nameError.classList.add('show');
//     } else {
//         nameError.textContent = '';
//         nameError.classList.remove('show');
//     }
// }

export function emailValidation(email, emailError) {
    const emailPrefix = /^[\w\-.]+@(stud\.)?noroff\.no$/;
    if (!emailPrefix.test(email)) {
        emailError.textContent = 'Not a valid email address. Must contain @stud.noroff.no.';
        emailError.classList.add('show');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('show');
    }
}

export function passwordValidation(password, passwordError) {
    if (password.length < 8) {
        passwordError.textContent = 'Password needs to be at least 8 characters.';
        passwordError.classList.add('show');
    } else {
        passwordError.textContent = '';
        passwordError.classList.remove('show');
    }
}

export function confirmPasswordValidation(password, confirmPassword, confirmPassError) {
    if (password !== confirmPassword) {
        confirmPassError.textContent = 'Passwords do not match. Please try again';
        confirmPassError.classList.add('show');
    } else {
        confirmPassError.textContent = '';
        confirmPassError.classList.remove('show');
    }
}