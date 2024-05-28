import { fontawsomeScript } from "../components/default.mjs";
import { createHeader } from "../components/header.mjs";
import { loggedInEvents, checkForAdmin } from "../components/loginState.mjs";
import { fetchApi, userUrl } from "../components/fetch.mjs";

const id = new URLSearchParams(window.location.search).get('id');
console.log('id, url params: ', id);

async function fetchBlog() {
    const data = await fetchApi('GET', `${userUrl}/${id}`);
    console.log('data fetchBlog: ', data);
    populateFields(data.data);
}

function populateFields(data) {
    document.getElementById('updateTitle').value = data.title;
    document.getElementById('updateBlogText').value = data.body;
    document.getElementById('updateUrl').value = data.media.url;
    document.getElementById('updateAlt').value = data.media.alt;

    const prevImageContainer = document.getElementById('updateBlogImg');
    let previewImage = document.getElementById('previewImg');

    if (!previewImage) {
        previewImage = document.createElement('img');
        previewImage.id = 'previewImg';
        prevImageContainer.appendChild(previewImage);
    }

    previewImage.src = data.media.url;
    previewImage.alt = data.media.alt;
    previewImage.classList.add('hide');

    // Check checkboxes based on tags
    const selectedTags = data.tags;
    selectedTags.forEach(tag => {
        const checkbox = document.getElementById(`inputTag${tag.replace(/\s+/g, '')}`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

document.getElementById('savePostBtn').addEventListener('click', async () => {
    if (!checkForAdmin()) {
        alert('You do not have permission to delete posts');
        window.location.reload();
        return;
    }
    const id = new URLSearchParams(window.location.search).get('id');

    console.log('click', id);
    const updatedPost = {
        title: document.getElementById('updateTitle').value,
        body: document.getElementById('updateBlogText').value,
        media: {
            url: document.getElementById('updateUrl').value,
            alt: document.getElementById('updateAlt').value
        },
        tags: Array.from(document.querySelectorAll('#tag-checkboxes input[type="checkbox"]:checked')).map(cb => cb.value)
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
            alert('Post successfully deleted, redirecting you to homepage');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error deleting this post:', error);
            alert('Failed to delete this post');
        }
    }
});

function previewImage() {
    const imageUrl = document.getElementById('updateUrl').value;
    const previewImageContainer = document.getElementById('updateBlogImg');
    let blogImg = document.getElementById('previewImg');

    if (!blogImg) {
        blogImg = document.createElement('img');
        blogImg.id = 'previewImg';
        previewImageContainer.appendChild(blogImg);
    }

    blogImg.src = imageUrl;
    blogImg.classList.remove('hide');
}

document.getElementById('updateUrl').addEventListener('input', previewImage);

const cancelButton = document.getElementById('clearPostBtn');

cancelButton.addEventListener('click', function (event) {
    event.preventDefault();
    const confirmClear = window.confirm('Do you want to clear all information in this post?')
    if (confirmClear) {
        document.getElementById('previewImg').src = '';
        document.getElementById('updateUrl').value = '';
        document.getElementById('updateAlt').value = '';
        document.getElementById('updateTitle').value = '';
        document.getElementById('updateBlogText').value = '';
        document.querySelectorAll('#tag-checkboxes input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});

fetchBlog();



// import { fontawsomeScript } from "../components/default.mjs";
// import { createHeader } from "../components/header.mjs";
// import { loggedInEvents, checkForAdmin } from "../components/loginState.mjs";
// import { fetchApi, userUrl } from "../components/fetch.mjs";


// // accessDenied()

// const id = new URLSearchParams(window.location.search).get('id');
// console.log('id, url params: ',id);

// async function fetchBlog() {
//         const data = await fetchApi('GET', `${userUrl}/${id}`);
//         console.log('data fetchBlog: ', data);
//         populateFields(data.data);
//         await fetchAndPopulateTags(data.data.tags);
// }


// function populateFields(data) {
//     document.getElementById('updateTitle').value = data.title;
//     document.getElementById('updateBlogText').value = data.body;
//     document.getElementById('updateUrl').value = data.media.url;
//     document.getElementById('updateAlt').value = data.media.alt;

//     const prevImageContainer = document.getElementById('updateBlogImg');
//     const previewImage = document.createElement('img');
//         previewImage.src = data.media.url;
//         previewImage.alt = data.media.alt;
//         previewImage.id = 'previewImg';

//         prevImageContainer.appendChild(previewImage);
// }

// // async function fetchAndPopulateTags(selectedTags) {
// //     // No need to fetch tags dynamically, as you want to use static checkboxes
// //     const tagsContainer = document.getElementById('tagsCheckboxContainer');

// //     selectedTags.forEach(tagName => {
// //         const checkbox = document.getElementById(`inputTag${tagName.replace(/\s+/g, '')}`); // Assuming tag names don't have spaces
// //         if (checkbox) {
// //             checkbox.checked = true;
// //         }
// //     });
// // }
// async function fetchAndPopulateTags(selectedTags) {
//     // Fetch available tags (assuming the endpoint is available)
//     const tagsData = await fetchApi('GET', userUrl);
//     console.log('Tags data: ', tagsData);

//     const tagsContainer = document.getElementById('tagsCheckboxContainer');
//     tagsContainer.innerHTML = '';

//     tagsData.data.forEach(tag => {
//         const checkboxLabel = document.createElement('label');
//         checkboxLabel.classList.add('custom-checkbox');
        
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.value = tag.name;
//         checkbox.checked = selectedTags.includes(tag.name);

//         const checkMark = document.createElement('span');
//         checkMark.classList.add('check-mark');

//         checkboxLabel.appendChild(checkbox);
//         checkboxLabel.appendChild(checkMark);
//         checkboxLabel.appendChild(document.createTextNode(tag.name));

//         tagsContainer.appendChild(checkboxLabel);
//     });
// }

// document.getElementById('savePostBtn').addEventListener('click', async () => {
//     if (!checkForAdmin()) {
//         alert('You do not have permission to delete posts');
//         window.location.reload(); 
//         return; 
//     }
//     const id = new URLSearchParams(window.location.search).get('id');
    
//     console.log('click',id);
//     const updatedPost = {
//         title: document.getElementById('updateTitle').value,
//         body: document.getElementById('updateBlogText').value,
//         media: {
//             url: document.getElementById('updateUrl').value,
//             alt: document.getElementById('updateAlt').value
//         },
//         tags: Array.from(document.querySelectorAll('#tagsCheckboxContainer input[type="checkbox"]:checked')).map(cb => cb.value)
//     };
//     await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             },
//             body: JSON.stringify(updatedPost),
//         });
//         alert('Updated post successfully')
//         window.location.href = `../post/index.html?id=${id}`;
// });


// document.getElementById('deletePostBtn').addEventListener('click', async () => {
//     if (!checkForAdmin()) {
//         alert('You do not have permission to delete posts');
//         window.location.reload(); 
//         return; 
//     }
//     const id = new URLSearchParams(window.location.search).get('id');
//     console.log('delete post id', id);
//     const confirmDel = confirm('Are you sure you want to delete this post?');
//     if (confirmDel) {
//         try {
//             await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//                 },
//             });
//             alert('Post successfully deleted, redirecting you to homepage');
//             window.location.href = '../index.html';
//         } catch (error) {
//             console.error('Error deleting this post:', error);
//             alert('Failed to delete this post');
//         }
//     }
// })


// function previewImage() {
//     const imageUrl = document.getElementById('updateUrl').value;
//     const previewImageContainer = document.getElementById('updateBlogImg');
//     let blogImg = document.getElementById('previewImg');

//     if (imageUrl.trim() !== '') {
//         if (!blogImg) {
//             blogImg = document.createElement('img');
//             blogImg.id = 'previewImg';
//             previewImageContainer.appendChild(blogImg);
//         }
//         blogImg.src = imageUrl;
//         blogImg.classList.remove('hide');
//     } else {
//         if (blogImg) {
//             blogImg.src = '';
//             blogImg.classList.add('hide');
//         }
//     }
// }

// document.getElementById('updateUrl').addEventListener('input', previewImage);

// const cancelButton = document.getElementById('clearPostBtn');

// cancelButton.addEventListener('click', function(event) {
//     event.preventDefault();
//     const confirmClear = window.confirm('Do you want to clear all information in this post?')
//     if (confirmClear) {
//         document.getElementById('previewImg').src = '';
//         document.getElementById('updateUrl').value = '';
//         document.getElementById('updateAlt').value = '';
//         document.getElementById('updateTitle').value = '';
//         document.getElementById('updateBlogText').value = '';
//         document.querySelectorAll('#tagsCheckboxContainer input[type="checkbox"]').forEach(checkbox => {
//             checkbox.checked = false;
//         });
//     }
// });

// fetchBlog();

// // cancelButton.addEventListener('click', function(event) {
// //     event.preventDefault();
// //     const confirmClear = window.confirm('Do you want to clear all information in this post?')
// //     if (confirmClear) {
// //         document.getElementById('previewImg').src = '';
// //         document.getElementById('updateUrl').value = '';
// //         document.getElementById('updateAlt').value = '';
// //         document.getElementById('updateTitle').value = '';
// //         document.getElementById('updateBlogText').value = '';
// //     }
// // });




