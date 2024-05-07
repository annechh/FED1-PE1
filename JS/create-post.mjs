

const token = '';

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
// const labelUrl =

addImgBtn.addEventListener('click', function() {
    createUrlInput.classList.toggle('hide');
    
}); 


















// import { userUrl, fetchApi } from "./fetch.mjs";

// const createPost = document.getElementById('createPostBtn');

// createPost.addEventListener('click', async(event) => {
//     event.preventDefault();

//     const formData = {
//         title: document.getElementById('createTitle').value,
//         author: document.getElementById('createAuthor').value,
//         body: document.getElementById('createBlogText').value,
//     };
//     try {
//         await fetchApi('POST', userUrl, formData );
//         alert('Successfully created new post')
//     } catch (error) {
//         console.error('Failed to create new post', error);
//         alert('Failed to create post. Please try again later');
//     }
// });


// // let formData = {
// //     title: document.getElementById('createTitle').value,
// //     author: document.getElementById('createAuthor').value,
// //     body: document.getElementById('createBlogText').value,
// //     media: document.getElementById('createBlogImg').value,
// //     // created: date of create blog post
// //     // updated: date of edit blog post
// // };

// // const createNewPost = () => {
// //     const createPostBtn = document.getElementById('createPostBtn')
// //     createPostBtn.addEventListener('click', async(event) => {
// //         event.preventDefault();
// //         try {
// //             await fetchApi('POST', formData);
// //             alert('Successfully created new post')
// //         } catch (error) {
// //             console.error('Failed to create new post', error);
// //             alert('Failed to create post. Please try again later');
// //         }
// //     });
// // }

// // createNewPost()

// function createNewParagraph() {

// }




