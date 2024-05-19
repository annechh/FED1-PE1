import { fontawsomeScript } from "./components/default.mjs";
import { createHeader } from "./components/header.mjs"; 
import { loggedInEvents } from "./components/loginState.mjs";


const token = localStorage.getItem('accessToken');


function previewImage() {
    const imageUrl = document.getElementById('createUrl').value;
    const previewImage = document.getElementById('createBlogImg');

    // previewImage.innerHTML = '';

    if (imageUrl.trim() !== '') {
        const blogImg = document.createElement('img');
        blogImg.src = imageUrl;
        blogImg.id = 'previewImg';
        blogImg.classList.remove('hide')

        previewImage.appendChild(blogImg);
    } else {
        previewImage.src = '';
        previewImage.classList.add('hide');
    }
}


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let image = document.getElementById('createUrl').value;
    let title = document.getElementById('createTitle').value;
    let blogText = document.getElementById('createBlogText').value;

    if (!title.trim() || !image.trim() || !blogText.trim()) {
        console.error('No field can be empty');
        return;
    }

    fetch('https://v2.api.noroff.dev/blog/posts/Shira', {
        method: 'POST',
        body: JSON.stringify({
            media: {
                url: image,
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
    .then((json) => console.log('json---', json));
});

const addImgBtn = document.getElementById('addImgBtn');
const createUrlInput = document.getElementById('createUrl');

addImgBtn.addEventListener('click', function() {
    createUrlInput.classList.toggle('hide');
});

createUrlInput.addEventListener('input', previewImage);



const cancelButton = document.getElementById('cancelPostBtn');

cancelButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    document.getElementById('createUrl').value = '';
    document.getElementById('createTitle').value = '';
    document.getElementById('createBlogText').value = '';
});

// //--------------------------------
// createUrlInput.addEventListener('input', function(event) {
//     const imageUrl = event.target.value.trim();
    
//     // Regular expression pattern to match URL
//     const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

//     if (urlPattern.test(imageUrl)) {
//         // Valid URL, create image tag
//         createPreviewImage(imageUrl);
//     } else {
//         // Not a valid URL, remove existing image tag if present
//         removePreviewImage();
//     }
// });

// function createPreviewImage(imageUrl) {
//     // Remove existing image tag if present
//     removePreviewImage();

//     // Create new image tag
//     const img = document.createElement('img');
//     img.src = imageUrl;
//     img.classList.add('preview-image');

//     // Append image tag to createBlogImg container
//     createBlogImg.appendChild(img);
// }

// function removePreviewImage() {
//     const existingImg = createBlogImg.querySelector('.preview-image');
//     if (existingImg) {
//         // Remove existing image tag
//         createBlogImg.removeChild(existingImg);
//     }
// }
// --------------------------------