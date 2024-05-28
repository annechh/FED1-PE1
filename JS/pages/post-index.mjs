import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents, checkForAdmin } from "../components/loginState.mjs";
import { fetchApi, userUrl } from "../components/fetch.mjs";


const months = [
    'January', 'February', 
    'March', 'April', 'May', 
    'June', 'July', 'August', 
    'September', 'October', 
    'November', 'December'
];



async function fetchBlogs() {
    const postId = new URLSearchParams(window.location.search).get('id');
    if (!postId) {
        console.error('No post ID found in Url');
        alert('Voffsies! could not find the Pawsome post');
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
    if (!checkForAdmin()) {
        alert('You do not have permission to delete posts');
        window.location.reload(); 
        return; 
    }
    const id = new URLSearchParams(window.location.search).get('id');
    const confirmDel = confirm('Voff! Are you sure you want to delete this Pawsome post?');

    if (confirmDel) {
        try {
            await fetchApi('DELETE', `${userUrl}/${id}`);
            alert('Pawsome post successfully deleted, redirecting you to homepage');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error deleting this post:', error);
            alert('Failed to delete this Pawsome post');
        }
    }
})




window.onscroll = function() {
    scrollFunction();
};




function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    scrollToTopBtn.addEventListener('click', function() {
    scrollToTop();
    });

    function scrollToTop() {
    document.documentElement.scrollTop = 0;
    }
});