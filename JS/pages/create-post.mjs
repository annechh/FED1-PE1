import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents, accessDenied } from "../components/loginState.mjs";
import { userUrl } from "../fetch.mjs";


accessDenied();


document.getElementById('createUrl').addEventListener('input', previewImage);

function previewImage() {
    const imageUrl = document.getElementById('createUrl').value;
    const previewImageContainer = document.getElementById('createBlogImg');
    let blogImg = document.getElementById('previewImg');

    if (imageUrl.trim() !== '') {
        if (!blogImg) {
            blogImg = document.createElement('img');
            blogImg.id = 'previewImg';
            previewImageContainer.appendChild(blogImg);
        }
        blogImg.src = imageUrl;
        blogImg.classList.remove('hide');
    } else {
        if (blogImg) {
            blogImg.src = '';
            blogImg.classList.add('hide');
        }
    }
}


document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        let image = document.getElementById('createUrl').value;
        let alt = document.getElementById('createAlt').value;
        let title = document.getElementById('createTitle').value;
        let blogText = document.getElementById('createBlogText').value;

        if (!title.trim() || !image.trim() || !blogText.trim()) {
            window.confirm('No field can be empty, please fill out all forms');
            console.error('No field can be empty, please fill out all forms');
            return;
        }

        const response = await createPost(image, alt, title, blogText);
        const json = await response.json();

        handleResponse(json);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the post. Please try again.');
    }
});

async function createPost(image, alt, title, blogText) {
    const token = localStorage.getItem('accessToken');

    return fetch(userUrl, {
        method: 'POST',
        body: JSON.stringify({
            media: {
                url: image,
                alt: alt,
            },
            title: title,
            body: blogText,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
        },
    });
}

function handleResponse(json) {
    console.log('json---', json);
    if (json.data && json.data.id) {
        alert('Successfully created new post');
        window.location.href = `../post/index.html?id=${json.data.id}`;
    } else {
        throw new Error('Post created but no ID returned');
    }
}



const addImgBtn = document.getElementById('addImgBtn');
const createUrlInput = document.getElementById('createUrl');
const createAltInput = document.getElementById('createAlt');

addImgBtn.addEventListener('click', function() {
    createUrlInput.classList.toggle('hide');
    createAltInput.classList.toggle('hide');
});

createUrlInput.addEventListener('input', previewImage);



const cancelButton = document.getElementById('cancelPostBtn');
cancelButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    
    const createUrl = document.getElementById('createUrl').value;
    const createAlt = document.getElementById('createAlt').value;
    const createTitle = document.getElementById('createTitle').value;
    const createBlogText = document.getElementById('createBlogText').value;

    if (!createUrl && !createAlt && !createTitle && !createBlogText) {
        alert('No fields to clear')
    } else {
        const confirmClear = window.confirm('Do you want to clear all fields in this post?');
        if (confirmClear) {
        document.getElementById('previewImg').src = '';
        document.getElementById('createUrl').value = '';
        document.getElementById('createAlt').value = '';
        document.getElementById('createTitle').value = '';
        document.getElementById('createBlogText').value = '';
        alert('All fields have been cleared');
    }}
});




// function createPost() {

// }

// document.querySelector('form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     let image = document.getElementById('createUrl').value;
//     let alt = document.getElementById('createAlt').value;
//     let title = document.getElementById('createTitle').value;
//     let blogText = document.getElementById('createBlogText').value;

//     if (!title.trim() || !image.trim() || !blogText.trim()) {
//         window.confirm('No field can be empty, please fill out all forms');
//         console.error('No field can be empty, please fill out all forms');
//         return;
//     }

//     fetch('https://v2.api.noroff.dev/blog/posts/Shira', {
//         method: 'POST',
//         body: JSON.stringify({
//             media: {
//                 url: image,
//                 alt: alt,
//             },
//             title: title,
//             body: blogText,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             Authorization: `Bearer ${token}`,
//         },
//     })
//     .then((response) => response.json())
//     .then((json) =>  {
//         console.log('json---', json)
//         if (json.data.id) {
//             alert('Successfully created new post');
//             window.location.href = `../post/index.html?id=${json.data.id}`;
//         } else {
//             throw new Error(alert('Post created but no ID returned'))
//         } 
//     });
// });



// const cancelButton = document.getElementById('cancelPostBtn');
// cancelButton.addEventListener('click', function(event) {
//     event.preventDefault(); 

//     const previewImg = document.getElementById('previewImg');
//     const createUrl = document.getElementById('createUrl').value;
//     const createAlt = document.getElementById('createAlt').value;
//     const createTitle = document.getElementById('createTitle').value;
//     const createBlogText = document.getElementById('createBlogText').value;

//     if (!previewImg.src && !createUrl && !createAlt && !createTitle && !createBlogText) {
//         alert('No content to clear')
//     } else {
//         const confirmClear = window.confirm('Do you want to clear all information in this post?');
//         if (confirmClear) {
//             if (previewImg.src) {
//                 previewImg.src = '';
//             }
//             document.getElementById('createUrl').value = '';
//             document.getElementById('createAlt').value = '';
//             document.getElementById('createTitle').value = '';
//             document.getElementById('createBlogText').value = '';
//         }
//     } 
// });