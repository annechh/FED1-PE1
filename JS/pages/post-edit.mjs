import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents } from "../components/loginState.mjs";
import { getUserData } from "../components/loginState.mjs";
// import { fetchApi, userUrl } from "../fetch.mjs";


const id = new URLSearchParams(window.location.search).get('id');

async function fetchBlogPost() {
    if (!getUserData()) {
        alert('No authorization to use this page, log in');
        window.location.href = '../account/login.html'
        return;
    }
    
    console.log('id, url params: ',id);
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch post data');
    }
    const data = await response.json();
    console.log(data);
    populateFields(data.data)
}


function populateFields(data) {
    document.getElementById('updateTitle').value = data.title;
    document.getElementById('updateBlogText').value = data.body;
    document.getElementById('updateUrl').value = data.media.url;
    document.getElementById('updateAlt').value = data.media.alt;
    const prevImageContainer = document.getElementById('updateBlogImg');
    const previewImage = document.createElement('img');
        previewImage.src = data.media.url;
        previewImage.alt = data.media.alt;
        previewImage.classList.add('hide');
        previewImage.id = 'previewImg';

        prevImageContainer.appendChild(previewImage);
}

document.getElementById('savePostBtn').addEventListener('click', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    console.log('click',id);
    const updatedPost = {
        title: document.getElementById('updateTitle').value,
        body: document.getElementById('updateBlogText').value,
        media: {
            url: document.getElementById('updateUrl').value,
            alt: document.getElementById('updateAlt').value
        },
    };
    await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedPost),
        });
        alert('Updated post successfully')
        window.location.href = `../post/index.html?id=${id}`;
});


document.getElementById('deletePostBtn').addEventListener('click', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    console.log('delete post id', id);
    const confirmDel = confirm('Are you sure you want to delete this post?');

    if (confirmDel) {
        try {
            await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error deleting this post:', error);
            alert('Failed to delete this post');
        }
    }
})
// Legg til på clear button me alert og godta eller avbryt

const updateImgBtn = document.getElementById('updateImgBtn');

updateImgBtn.addEventListener('click', function() {
    const updateUrlInput = document.getElementById('updateUrl');
    const updateAltInput = document.getElementById('updateAlt');
    updateUrlInput.classList.toggle('hide');
    updateAltInput.classList.toggle('hide');

});


function previewImage() {
    const imageUrl = document.getElementById('updateUrl').value;
    const previewImageContainer = document.getElementById('updateBlogImg');
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

document.getElementById('updateUrl').addEventListener('input', previewImage);

const cancelButton = document.getElementById('clearPostBtn');

cancelButton.addEventListener('click', function(event) {
    event.preventDefault();
    const confirmClear = window.confirm('Do you want to clear all information in this post?')
    
    if (confirmClear) {
        document.getElementById('previewImg').src = '';
        document.getElementById('updateUrl').value = '';
        document.getElementById('updateAlt').value = '';
        document.getElementById('updateTitle').value = '';
        document.getElementById('updateBlogText').value = '';
    }
});



fetchBlogPost()

