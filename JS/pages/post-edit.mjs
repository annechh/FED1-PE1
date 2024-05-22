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
    document.getElementById('previewImg').src = postData.media.url;
    
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

})


fetchBlogPost()













//     try {
//         const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${postId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (!response.ok) {
//             throw new Error('Failed to fetch post data');
//         }
//         const postData = await response.json();
//         return postData.data; // Assuming the post data is nested under 'data'
//     } catch (error) {
//         console.error('Error fetching post data:', error);
//         // You can handle the error here, e.g., display an error message to the user
//         return null;
//     }
// }

// function populateFields(postData) {
//     document.getElementById('updateTitle').value = postData.title;
//     document.getElementById('updateBlogText').value = postData.body;
//     document.getElementById('updateUrl').value = postData.media.url;
//     document.getElementById('previewImg').src = postData.media.url;
// }


// const urlParams = new URLSearchParams(window.location.search);
// const postId = urlParams.get('id');
// console.log('post Id: ',postId);


// window.addEventListener('DOMContentLoaded', async () => {
//     if (postId) {
//         const postData = await fetchPostData(postId);
//         if (postData) {
//             populateFields(postData);
//         } else {
//             // Handle case where no post data is fetched
//             console.error('No post data found');
//         }
//     } else {
//         // Handle case where no post ID is found in the URL
//         console.error('No post ID found in URL');
//     }
// });


// async function savePostData(postId) {
//     try {
//         // Fetch updated post data from input fields
//         const updatedPost = {
//             title: document.getElementById('updateTitle').value,
//             body: document.getElementById('updateBlogText').value,
//             media: {
//                 url: document.getElementById('updateUrl').value
//             },
//             // Add other fields if necessary
//         };

//         // Send PUT request to update post data
//         const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${postId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Assuming you have an accessToken stored in localStorage
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             },
//             body: JSON.stringify(updatedPost)
//         });

//         if (response.ok) {
//             console.log('Post updated successfully');
//             // Redirect to the post/index.html page with the updated post ID
//             // window.location.href = `/post/index.html`;
//         } else {
//             console.error('Failed to update post:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error updating post:', error);
//     }
// }


// document.getElementById('savePostBtn').addEventListener('click', async () => {
//     const postId = new URLSearchParams(window.location.search).get('id');
//     console.log('new post id',postId);
//     if (postId) {
//         await savePostData(postId);
//     } else {
//         console.error('No post ID found in URL');
//     }
// });










// function showPostToEdit(data) {
//     try {
//         document.getElementById('previewImg').src = data.media.url;
//         document.getElementById('updateUrl').value = data.media.url;
//         document.getElementById('updateTitle').value = data.title;
//         document.getElementById('updateBlogText').value = data.body;
//     } catch (error) {
//         console.error('Error showing post:', error);
//         throw error;
//     }
// }


// const idParameter = window.location.search;
// const searchParameter = new URLSearchParams(idParameter);
// const postId = searchParameter.get('id');
// console.log('POST ID',postId);

// if (postId) {
// }

// async function getPostData(postId) {
//     try {
//         // const postId = new URLSearchParams(window.location.search).get('id');
//         const response = await fetchApi('GET', `${userUrl}/${postId}`);
//         console.log('RESPONSE: ', response);
//         if (response.data) {
//             showPostToEdit(response.data);
//         } else {
//             console.error('No data found for the post');
//         }
//     } catch (error) {
//         console.error('Error fetching post data:', error);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     getPostData(postId);
// });
// document.getElementById('savePostBtn').addEventListener('click', () => {
//     const postId = new URLSearchParams(window.location.search).get('id');
//     savePostData(postId);
// }); 

// async function savePostData(postId) {
//     try {
//         // const postId = new URLSearchParams(window.location.search).get('id');
//         const updatedPost = {
//             title: document.getElementById('updateTitle').value,
//             body: document.getElementById('updateBlogText').value,
//             media: {
//                 url: document.getElementById('updateUrl').value
//             },
//         };
//         const token = localStorage.getItem('accessToken'); 
//         const response = await fetchApi('PUT', `${userUrl}/${postId}`, updatedPost, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,  
//             },
//         });
//         console.log('response', response);
//         if (response.ok) {
//             console.log('Post updated successfully:', response);
//             window.location.href = `/post/index.html?id=${postId}`;
//         } else {
//             console.error('Failed to update post:', response);
//         }
//     } catch (error) {
//         console.error('Error updating post:', error);
//     }
// }

// // function userDataLocalStorage() {
// //     const userDataString = localStorage.getItem('userData');
// //     if (userDataString) {
// //         try {
// //             // Parse the JSON string back to an object
// //             const userData = JSON.parse(userDataString);
// //             console.log('Logged in user data',userData);
// //             return userData;
// //         } catch (error) {
// //             console.error('Failed to parse userData from local storage:', error);
// //             return null;
// //         }
// //     }
// //     return null;
// // }

// // userDataLocalStorage();



// // import { fontawsomeScript } from "../components/default.mjs";

// // import { createHeader } from "../components/header.mjs";
// // import { loggedInEvents } from "../components/loginState.mjs";
// // import { fetchApi, userUrl } from "../fetch.mjs";


// // function showPostToEdit(data) {
// //     try {
// //         document.getElementById('previewImg').src = data.media.url;
// //         document.getElementById('updateUrl').value = data.media.url;
// //         document.getElementById('updateTitle').value = data.title;
// //         document.getElementById('updateBlogText').value = data.body;
// //     } catch (error) {
// //         console.error('Error showing post:', error);
// //         throw error;
// //     }
// // }


// // async function getPostData() {
// //     try {
// //         const postId = new URLSearchParams(window.location.search).get('id');
// //         const response = await fetchApi( 'GET', `${userUrl}/${postId}`);
        
// //         console.log('RESPONSE: ',response);
// //         if (response.data) {
// //             showPostToEdit(response.data);
// //         }else {
// //             console.error('No data found for the post');
// //         }
// //     } catch (error) {
// //         console.error('Error fetching post data:', error);
// //     }
// // }
// // getPostData()



// // const token = localStorage.getItem('accessToken');
// // console.log('TOKEN',token);

// // async function savePostData() {
// //     try {
// //         const postId = new URLSearchParams(window.location.search).get('id');
// //         console.log('POST ID',postId);
// //         const updatedPost = {
// //             title: document.getElementById('updateTitle').value,
// //             body: document.getElementById('updateBlogText').value,
// //             media: {
// //                 url: document.getElementById('updateUrl').value
// //             },
// //         };
// //         const response = await fetchApi('PUT', `${userUrl}/${postId}`, updatedPost, {
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 Authorization: `Bearer ${token}`,  
// //             },
// //         });
// //         console.log('response', response);
// //         if (response.ok) {
// //             console.log('Post updated successfully:', response);
// //             // Redirect to the specific blog post page with updated info
// //             window.location.href = `/post/index.html?id=${postId}`;
// //         } else {
// //             console.error('Failed to update post:', response);
// //         }
        
// //     } catch (error) {
// //         console.error('Error updating post:', error)
// //         console.log('WRONG');
// //     }
// // }


// // document.getElementById('savePostBtn').addEventListener('click', savePostData);


// // function userDataLocalStorage() {
// //     const userDataString = localStorage.getItem('userData');
// //     if (userDataString) {
// //         try {
// //             // Parse the JSON string back to an object
// //             const userData = JSON.parse(userDataString);
// //             console.log('Logged in user data',userData);
// //             return userData;
// //         } catch (error) {
// //             console.error('Failed to parse userData from local storage:', error);
// //             return null;
// //         }
// //     }
// //     return null;
// // }
// // userDataLocalStorage()



// // fa-pen-to-square - edit icon
// // fa-floppy-disk - save icon

// // let blogPost = localStorage.getItem('blogPost');
// // let blogData = JSON.parse(blogPost)
// // console.log('BLOG DATA: ',blogData);