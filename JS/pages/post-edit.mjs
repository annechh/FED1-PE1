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
    const postData = await response.json();
    console.log(postData);
    populateFields(postData.data)
}


function populateFields(postData) {
    document.getElementById('updateTitle').value = postData.title;
    document.getElementById('updateBlogText').value = postData.body;
    document.getElementById('updateUrl').value = postData.media.url;
    const prevImageContainer = document.getElementById('updateBlogImg');
    const previewImage = document.createElement('img');
        previewImage.src = postData.media.url;
        previewImage.classList.add('hide');
        previewImage.id = 'previewImg';
        previewImage.alt = postData.title;

        prevImageContainer.appendChild(previewImage);
}

document.getElementById('savePostBtn').addEventListener('click', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    console.log('click',id);
    const updatedPost = {
        title: document.getElementById('updateTitle').value,
        body: document.getElementById('updateBlogText').value,
        media: {
            url: document.getElementById('updateUrl').value
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

const updateImgBtn = document.getElementById('updateImgBtn');
updateImgBtn.addEventListener('click', function() {
    const updateUrlInput = document.getElementById('updateUrl');
    updateUrlInput.classList.toggle('hide');
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



// const cancelButton = document.getElementById('cancelPostBtn');

// cancelButton.addEventListener('click', function(event) {
//     event.preventDefault(); 

//     document.getElementById('previewImg').src = '';
//     document.getElementById('updateUrl').value = '';
//     document.getElementById('updateTitle').value = '';
//     document.getElementById('updateBlogText').value = '';
// });

document.getElementById('updateUrl').addEventListener('input', previewImage);

fetchBlogPost()

