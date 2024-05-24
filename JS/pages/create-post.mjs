import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents } from "../components/loginState.mjs";





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


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let image = document.getElementById('createUrl').value;
    let alt = document.getElementById('createAlt').value;
    let title = document.getElementById('createTitle').value;
    let blogText = document.getElementById('createBlogText').value;

    if (!title.trim() || !image.trim() || !blogText.trim()) {
        console.error('No field can be empty');
        return;
    }

    const token = localStorage.getItem('accessToken');

    fetch('https://v2.api.noroff.dev/blog/posts/Shira', {
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
    })
    .then((response) => response.json())
    .then((json) =>  {
        console.log('json---', json)
        if (json.data.id) {
            alert('Successfully created new post');
            window.location.href = `../post/index.html?id=${json.data.id}`;
        } else {
            throw new Error(alert('Post created but no ID returned'))
        } 
    });
});

const addImgBtn = document.getElementById('addImgBtn');
addImgBtn.addEventListener('click', function() {
    const createUrlInput = document.getElementById('createUrl');
    const createAltInput = document.getElementById('createAlt');
    createUrlInput.classList.toggle('hide');
    createAltInput.classList.toggle('hide');
});

createUrlInput.addEventListener('input', previewImage);



const cancelButton = document.getElementById('cancelPostBtn');
cancelButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    const confirmClear = window.confirm('Do you want to clear all information in this post?')
    if (confirmClear) {
    document.getElementById('previewImg').src = '';
    document.getElementById('createUrl').value = '';
    document.getElementById('createAlt').value = '';
    document.getElementById('createTitle').value = '';
    document.getElementById('createBlogText').value = '';
    }
});

