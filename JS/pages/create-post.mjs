import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents } from "../components/loginState.mjs";
import { userUrl } from "../components/fetch.mjs";


// accessDenied();

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectedTags = [];

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const tag = this.value;
        if (this.checked) {
            console.log(tag);
            // If checkbox is checked, add tag to selectedTags
            selectedTags.push(tag);
        } else {
            // If checkbox is unchecked, remove tag from selectedTags
            const index = selectedTags.indexOf(tag);
            if (index !== -1) {
                selectedTags.splice(index, 1);
            }
        }
        console.log(selectedTags); // Optionally, log selected tags for debugging
    });
});

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
            tags: selectedTags,
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

function getUrlInputLabel() {
    const createUrlInput = document.getElementById('createUrl');
    const urlLabel = document.querySelector(`label[for='createUrl']`);
    return { createUrlInput, urlLabel };
}

function getAltInputLabel() {
    const createAltInput = document.getElementById('createAlt');
    const altLabel = document.querySelector(`label[for='createAlt']`);
    return { createAltInput, altLabel };
}

function getTitleInputLabel() {
    const createTitleInput = document.getElementById('createTitle');
    const titleLabel = document.querySelector(`label[for='createTitle']`);
    return { createTitleInput, titleLabel };
}

function getBlogTextInputLabel() {
    const createBlogTextInput = document.getElementById('createBlogText');
    const blogTextLabel = document.querySelector(`label[for='createBlogText']`);
    return { createBlogTextInput, blogTextLabel };
}

addImgBtn.addEventListener('click', function() {
    const { createUrlInput, urlLabel } = getUrlInputLabel();
    const { createAltInput, altLabel } = getAltInputLabel();
    const { createTitleInput, titleLabel } = getTitleInputLabel();
    const { createBlogTextInput, blogTextLabel } = getBlogTextInputLabel();
    const createPost = document.getElementById('createPostBtn');
    const cancelPost = document.getElementById('cancelPostBtn');
    const chooseTagsSelect = document.getElementById('tagSelect');
    const tag1 = document.getElementById('tag1');
    const tag2 = document.getElementById('tag2');
    const tag3 = document.getElementById('tag3');
    const tag4 = document.getElementById('tag4');
    
    createUrlInput.classList.toggle('hide');
    urlLabel.classList.toggle('hide');
    createAltInput.classList.toggle('hide');
    altLabel.classList.toggle('hide');
    createTitleInput.classList.toggle('hide');
    titleLabel.classList.toggle('hide');
    createBlogTextInput.classList.toggle('hide');
    blogTextLabel.classList.toggle('hide');
    createPost.classList.toggle('hide');
    cancelPost.classList.toggle('hide');
    chooseTagsSelect.classList.toggle('hide');
    tag1.classList.toggle('hide');
    tag2.classList.toggle('hide');
    tag3.classList.toggle('hide');
    tag4.classList.toggle('hide');
});

const createUrlInput = document.getElementById('createUrl');
createUrlInput.addEventListener('input', previewImage);

const cancelButton = document.getElementById('cancelPostBtn');
cancelButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    
    const createUrl = document.getElementById('createUrl').value;
    const createAlt = document.getElementById('createAlt').value;
    const createTitle = document.getElementById('createTitle').value;
    const createBlogText = document.getElementById('createBlogText').value;

    if (!createUrl && !createAlt && !createTitle && !createBlogText) {
        alert('No fields to clear');
    } else {
        const confirmClear = window.confirm('Do you want to clear all fields in this post?');
        if (confirmClear) {
            document.getElementById('previewImg').src = '';
            document.getElementById('createUrl').value = '';
            document.getElementById('createAlt').value = '';
            document.getElementById('createTitle').value = '';
            document.getElementById('createBlogText').value = '';
            alert('All fields have been cleared');
        }
    }
});
