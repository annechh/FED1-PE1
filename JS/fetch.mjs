

const baseUrl = "https://v2.api.noroff.dev";
export const userUrl = `${baseUrl}/blog/posts/Shira`;
export const loginUrl = `${baseUrl}/auth/login`;
export const registerUrl = `${baseUrl}/auth/register`;

// Make userUrl usable for whatever registered account that is being made
// `${baseUrl}/blog/posts/${name}`

// GET, POST - /blog/posts/Shira
// PUT, DELETE, GET - /blog/posts/Shira/{id}
// https://v2.api.noroff.dev/blog/posts/Shira

export async function fetchApi(method, url, body) {  
    
    try {
        // const token = '';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(body),
        });
        
        const data = await response.json();
        // console.log('RESPONSE',response);
        // console.log('DATA',data);
        return data;
    } 
    catch (error) {
        console.error('Could not fetch data' + error);
        throw error ("There was a problem getting the data")
    }
}




// from login.mjs file
// import { loginUrl, fetchApi } from "./fetch.mjs";

// function createLoginForm() {
//     let section = document.getElementById('loginSection');

//     let h1 = document.createElement('h1');
//     h1.innerText = 'Log In';

//     let form = document.createElement('form');
//     form.id = 'loginForm';
//     // form.addEventListener('submit', handleLogin);

//     let inputName = ['Email', 'Password'];
//     let inputId = ['loginEmail', 'loginPassword'];
//     let inputType = ['text', 'password'];

//     for (let i = 0; i < inputName.length; i++) {
//         let input = document.createElement('input');
//         input.name = inputName[i];
//         input.type = inputType[i];
//         input.id = inputId[i];
//         input.placeholder = inputName[i];

//         form.appendChild(input);
//     }

//     let btnContainer = document.createElement('div');
//     btnContainer.classList = 'btn-container';

//     let loginButton = document.createElement('button');
//     loginButton.type = 'submit';
//     loginButton.innerText = 'Log In';
//     loginButton.classList = 'btn';
//     loginButton.id = 'loginBtn'

//     let changeToRegister = document.createElement('a');
//     changeToRegister.innerText = 'Not a user? Register here';
//     changeToRegister.href = '../account/register.html';

//     btnContainer.append(loginButton, changeToRegister);

//     form.appendChild(btnContainer)
//     section.append(h1, form);

//     form.addEventListener('submit', handleLoginFormSubmit);

//     return section;
// }

// createLoginForm()






// function handleLoginFormSubmit(event) {
//     event.preventDefault();

//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;

//     handleLogin(email, password);
// }

// async function handleLogin(event) {
//     event.preventDefault(); 

//     // const email = document.getElementById('loginEmail').value;
//     // const password = document.getElementById('loginPassword').value;

//     try {
//         const userData = await fetchApi('POST', loginUrl, { email, password });
//         console.log('Login successful:', userData);

//         const accessToken = userData.data.accessToken;
//         if (accessToken) {
//             localStorage.setItem('accessToken', accessToken);
//             console.log('Token saved to local storage', accessToken);

//             window.location.href = '../index.html'
//         } else {
//             console.error('No token found', userData);
//         }

//         // return userData;

//     } catch (error) {
//         console.error('Login failed:', error);
//     }
// }

// // const token = localStorage.getItem('accessToken');


