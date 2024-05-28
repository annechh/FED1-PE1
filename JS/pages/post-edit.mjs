import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents, checkForAdmin } from "../components/loginState.mjs";
import { fetchApi, userUrl } from "../components/fetch.mjs";
import { clearFields } from "../components/clear-fields.mjs";



const id = new URLSearchParams(window.location.search).get('id');



async function fetchBlog() {
    const data = await fetchApi('GET', `${userUrl}/${id}`);
    populateFields(data.data);
}




function populateFields(data) {
    document.getElementById('fieldTitle').value = data.title;
    document.getElementById('fieldBlogText').value = data.body;
    document.getElementById('fieldUrl').value = data.media.url;
    document.getElementById('fieldAlt').value = data.media.alt;

    const prevImageContainer = document.getElementById('fieldBlogImg');
    let previewImage = document.getElementById('previewImg');

    if (!previewImage) {
        previewImage = document.createElement('img');
        previewImage.id = 'previewImg';
        prevImageContainer.appendChild(previewImage);
    }
    previewImage.src = data.media.url;
    previewImage.alt = data.media.alt;
    previewImage.classList.add('hide');
    
    data.tags.forEach(tag => {
        const checkbox = document.querySelector(`input[name='tags'][value='${tag}']`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}




function getSelectedTags() {
    return Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(cb => cb.value);
}




document.getElementById('savePostBtn').addEventListener('click', async () => {
    if (!checkForAdmin()) {
        alert('You do not have permission to delete posts');
        window.location.reload();
        return;
    }
    const id = new URLSearchParams(window.location.search).get('id');

    const updatedPost = {
        title: document.getElementById('fieldTitle').value,
        body: document.getElementById('fieldBlogText').value,
        media: {
            url: document.getElementById('fieldUrl').value,
            alt: document.getElementById('fieldAlt').value
        },
        tags: getSelectedTags(),
    };
    await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(updatedPost),
    });
    alert('Updated post successfully');
    window.location.href = `../post/index.html?id=${id}`;
});




document.getElementById('deletePostBtn').addEventListener('click', async () => {
    if (!checkForAdmin()) {
        alert('You do not have permission to delete posts');
        window.location.reload();
        return;
    }
    const id = new URLSearchParams(window.location.search).get('id');
    const confirmDel = confirm('Voff! Are you sure you want to delete this Pawsome post?');
    if (confirmDel) {
        try {
            await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
            alert('Post successfully deleted, redirecting you to homepage');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error deleting this post:', error);
            alert('Failed to delete this post');
        }
    }
});




function previewImage() {
    const imageUrl = document.getElementById('fieldUrl').value;
    const previewImageContainer = document.getElementById('fieldBlogImg');
    let blogImg = document.getElementById('previewImg');

    if (!blogImg) {
        blogImg = document.createElement('img');
        blogImg.id = 'previewImg';
        previewImageContainer.appendChild(blogImg);
    }

    blogImg.src = imageUrl;
    blogImg.classList.remove('hide');
}

document.getElementById('fieldUrl').addEventListener('input', previewImage);

clearFields();
fetchBlog();






