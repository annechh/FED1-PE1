import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents } from "../components/loginState.mjs";
import { userUrl } from "../components/fetch.mjs";
import { clearFields } from "../components/clear-fields.mjs";


const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectedTags = [];


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const tag = this.value;
        if (this.checked) {
            selectedTags.push(tag);
        } else {
            const index = selectedTags.indexOf(tag);
            if (index !== -1) {
                selectedTags.splice(index, 1);
            }
        }
        console.log(selectedTags);
    });
});





document.getElementById('fieldUrl').addEventListener('input', previewImage);

function previewImage() {
    const imageUrl = document.getElementById('fieldUrl').value;
    const previewImageContainer = document.getElementById('fieldBlogImg');
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
        let image = document.getElementById('fieldUrl').value;
        let alt = document.getElementById('fieldAlt').value;
        let title = document.getElementById('fieldTitle').value;
        let blogText = document.getElementById('fieldBlogText').value;

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
            tags: selectedTags,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
        },
    });
}




function handleResponse(json) {
    if (json.data && json.data.id) {
        alert('Successfully created new post');
        window.location.href = `../post/index.html?id=${json.data.id}`;
    } else {
        throw new Error('Post created but no ID returned');
    }
}





const createUrlInput = document.getElementById('fieldUrl');
createUrlInput.addEventListener('input', previewImage);





document.addEventListener('DOMContentLoaded', function() {
    const addImgBtn = document.getElementById('addImgBtn');
    addImgBtn.addEventListener('click', function() {
        const elementsToToggle = document.querySelectorAll('.select-hidden');
        elementsToToggle.forEach(element => {
            element.classList.toggle('hide');
        });
    });  
});

clearFields();
