import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents } from "../components/loginState.mjs";
import { fetchApi, userUrl } from "../components/fetch.mjs";


const months = [
    "January", "February", 
    "March", "April", "May", 
    "June", "July", "August", 
    "September", "October", 
    "November", "December"
];


async function fetchBlogs() {
    const postId = new URLSearchParams(window.location.search).get('id');
        console.log('POST ID',postId);
    if (!postId) {
        console.error('No post ID found in Url');
        return;
    }
    const data = await fetchApi('GET',`${userUrl}/${postId}`);
    getFields(data);
}

fetchBlogs();


function getFields(data) {
    let image = document.getElementById('specificBlogImg');
            image.src = data.data.media.url;
            image.alt = data.data.media.alt;
        
        let title = document.getElementById('specificBlogTitle');
            title.textContent = data.data.title;

        let text = document.getElementById('specificBlogText');
        
        let formattedText = data.data.body
        .split('\n')
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph !== '')
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
            text.innerHTML = formattedText;

        let formattedDate = new Date(data.data.created)
        let date = document.getElementById('specificBlogDate');
            date.textContent = `
            ${formattedDate.getDate()} 
            ${months[formattedDate.getMonth()]} 
            ${formattedDate.getFullYear()}
            `;

        let formattedUpdatedDate = new Date(data.data.updated)
        let updatedDate = document.getElementById('specificBlogUpdatedDate');
            updatedDate.textContent = `
            ${formattedUpdatedDate.getDate()} 
            ${months[formattedUpdatedDate.getMonth()]} 
            ${formattedUpdatedDate.getFullYear()}
            `;
        
        let author = document.getElementById('specificBlogAuthor');
            author.textContent = data.data.author.name;
    
        let shareBtn = document.getElementById('shareBtn');
            shareBtn.addEventListener('click', () => {
                const postUrl = window.location.href;
                navigator.clipboard.writeText(postUrl);
                if(navigator.clipboard) {
                    alert('Url has been copied to clipboard');
                } else {
                    alert('Failed to copy url');       
                }
            })

        let editBtn = document.getElementById('editBtn');
            editBtn.addEventListener('click', () => {
                window.location.href = `../post/edit.html?id=${data.data.id}`;
            })
}

document.getElementById('deletePostBtn').addEventListener('click', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    console.log('delete post id', id);
    const confirmDel = confirm('Are you sure you want to delete this post?');

    if (confirmDel) {
        try {
            await fetchApi('DELETE', `${userUrl}/${id}`);
            alert('Post successfully deleted, redirecting you to homepage');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error deleting this post:', error);
            alert('Failed to delete this post');
        }
    }
})

