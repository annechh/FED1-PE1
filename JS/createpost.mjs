import { fetchApi } from "./fetch.mjs";

const createPost = document.getElementById('createPostBtn');

createPost.addEventListener('click', async(event) => {
    event.preventDefault();

    const formData = {
        title: document.getElementById('createTitle').value,
        author: document.getElementById('createAuthor').value,
        body: document.getElementById('createBlogText').value,
    };
    try {
        await fetchApi('POST', formData);
        alert('Successfully created new post')
    } catch (error) {
        console.error('Failed to create new post', error);
        alert('Failed to create post. Please try again later');
    }
});


// let formData = {
//     title: document.getElementById('createTitle').value,
//     author: document.getElementById('createAuthor').value,
//     body: document.getElementById('createBlogText').value,
//     media: document.getElementById('createBlogImg').value,
//     // created: date of create blog post
//     // updated: date of edit blog post
// };

// const createNewPost = () => {
//     const createPostBtn = document.getElementById('createPostBtn')
//     createPostBtn.addEventListener('click', async(event) => {
//         event.preventDefault();
//         try {
//             await fetchApi('POST', formData);
//             alert('Successfully created new post')
//         } catch (error) {
//             console.error('Failed to create new post', error);
//             alert('Failed to create post. Please try again later');
//         }
//     });
// }

// createNewPost()

function createNewParagraph() {

}




