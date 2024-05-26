import { carousel } from "./carousel.mjs";
import { fontawsomeScript } from "./components/default.mjs";
import { indexHeader } from "./components/indexHeader.mjs";
import { loggedInEvents, getUserData } from "./components/loginState.mjs";
import { fetchApi, userUrl } from "./fetch.mjs";


async function loadPage() {

    fetchBlogPosts2()
}



const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



async function fetchBlogPosts2() {
    const data = await fetchApi('GET', `https://v2.api.noroff.dev/blog/posts/Shira`);
    console.log('Data index page: ', data);
    createBlogCards(data.data)
}



function createBlogCards(blogPosts) {
    const blogCardWrapper = document.getElementById('cardWrapper');

    blogPosts.forEach(data => {
        
        let blogCard = document.createElement('div');
        blogCard.classList.add('blog-card', 'flex', 'flex-col');
        const navigateToPost = () => {
            window.location.href = `post/index.html?id=${data.id}`;
        };

        blogCard.addEventListener('click', navigateToPost);

        const imgContainer = document.createElement('div');
            imgContainer.classList.add('card-img-container');

        const img = document.createElement('img');
            img.alt = data.media.alt;
            if (data.media && data.media.url) {
            img.src = data.media.url;
            } else {
            img.src = '';
            }

        const blogCardInfo = document.createElement('div');
            blogCardInfo.classList.add('blog-card-info', 'gap', 'flex', 'flex-col', 'items-center', 'py');
        
        const divCheckbox = document.createElement('label');
            divCheckbox.classList.add('custom-checkbox');

        const checkboxLabel = document.createElement('span');
            checkboxLabel.classList.add('checkbox-label');
            checkboxLabel.textContent = 'Select';
        
        const deleteCheckbox = document.createElement('input');
            deleteCheckbox.type = 'checkbox';
            deleteCheckbox.classList.add('delete-checkbox');
            deleteCheckbox.value = data.id;
            deleteCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    spanCheckMark.classList.add('fa-solid', 'fa-check');
                } else {
                    spanCheckMark.classList.remove('fa-solid', 'fa-check');
                }
            });

        const spanCheckMark = document.createElement('span');
            spanCheckMark.classList.add('check-mark');

        const titleDateContainer = document.createElement('div');
            titleDateContainer.classList.add('card-title-date','flex', 'flex-col');

        const title = document.createElement('h2');
            title.textContent = data.title;

        const date = document.createElement('p');
            date.textContent = ' ';

        const formattedDate = new Date(data.created)
        const span = document.createElement('span');
            span.textContent = `
            ${formattedDate.getDate()} 
            ${months[formattedDate.getMonth()]} 
            ${formattedDate.getFullYear()}`;

        imgContainer.appendChild(img);
        date.appendChild(span);
        titleDateContainer.append(title, date);
        divCheckbox.append(deleteCheckbox, spanCheckMark, checkboxLabel);
        blogCardInfo.append(divCheckbox, titleDateContainer);
        blogCard.append(imgContainer, blogCardInfo);
        blogCardWrapper.appendChild(blogCard);

        blogCard._navigateToPost = navigateToPost;
    });
}



function welcomeUser() {
    const userData = getUserData()
    if (userData) {
        const userName = userData.name

        const introWrapper = document.querySelector('.intro-wrapper');

        const welcomeDiv = document.createElement('div');

        const welcomeTitle = document.createElement('h2');
            welcomeTitle.classList.add('welcome-user-title');
            welcomeTitle.style.fontSize = '50px';
            welcomeTitle.textContent = `Welcome back, ${userName} !`;

        welcomeDiv.appendChild(welcomeTitle)
        introWrapper.insertBefore(welcomeDiv, introWrapper.firstChild)
    }
}

welcomeUser();



const selectBtn = document.getElementById('selectPostsBtn');
const deleteBtn = document.getElementById('deleteSelectedPostsBtn');
const cancelBtn = document.getElementById('cancelSelectPostsBtn');
// const cardLink = document.querySelector('.blog-card');

function selectPostsBtn() {
    selectBtn.addEventListener('click', () => {
        console.log('Select post, changed to Delete post',selectBtn);
        selectBtn.style.display = 'none';
        deleteBtn.style.display = 'flex';
        cancelBtn.style.display = 'flex';
        
        document.querySelectorAll('.blog-card').forEach(blogCard => {
            blogCard.removeEventListener('click', blogCard._navigateToPost);
        });

        displayCheckBox()
    })
}
deleteSelectedPosts()
cancelSelectPosts(); 
selectPostsBtn()


function cancelSelectPosts() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            console.log('Delete post, changed to Select post');
            resetUI();
        }
    });

    cancelBtn.addEventListener('click', () => {
        resetUI();
    })
}


function deleteSelectedPosts() {
    deleteBtn.addEventListener('click', async () => {
        const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
        const ids = Array.from(checkboxes).map(checkbox => checkbox.value);
        console.log('ids selected',ids);
        if (ids.length === 0) {
            alert('No posts selected for deletion');
            return;
        }
        try {
            for (const id of ids) {
                await fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                console.log(`Deleted post with ID: ${id}`);
            }
            const confirmDelete = window.confirm('Do you want to delete selected posts?');
            alert('Selected posts deleted successfully');
            if (confirmDelete) {
                resetUI(); // Reset the UI after deletion
                window.location.href = '../index.html';
            }
        } catch (error) {
            console.error('Error deleting posts:', error);
            alert('Failed to delete selected posts');
        }
    });
}


function displayCheckBox() { 
    const customCheckboxes = document.querySelectorAll('.custom-checkbox');
    customCheckboxes.forEach(customCheckbox => {
        customCheckbox.style.display = 'flex';
        const checkbox = customCheckbox.querySelector('.delete-checkbox');
        const checkMark = customCheckbox.querySelector('.check-mark');
        if (checkMark) {
            checkMark.style.display = 'block';
        }
        checkbox.addEventListener('change', () => {
            console.log(`Checkbox with value ${checkbox.value} checked: ${checkbox.checked}`);
        });
    });
    console.log('customCheckboxes: ', customCheckboxes);
}


function resetUI() {
    const customCheckboxes = document.querySelectorAll('.custom-checkbox');
    if (customCheckboxes.length > 0) {
        customCheckboxes.forEach(customCheckbox => {
            const checkbox = customCheckbox.querySelector('.delete-checkbox');
            const checkMark = customCheckbox.querySelector('.check-mark');
            
            if (checkbox) {
                checkbox.checked = false;
            }
            if (checkMark) {
                checkMark.style.display = 'none';
            }
            if (checkMark.classList.contains('fa-check')) {
                checkMark.classList.remove('fa-check');
            }
            customCheckbox.style.display = 'none';
        });
    }
    document.querySelectorAll('.blog-card').forEach(blogCard => {
        blogCard.addEventListener('click', blogCard._navigateToPost);
    });

    deleteBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    selectBtn.style.display = 'flex';
}

loadPage()






// fetchBlogPosts(currentPage);
// fetchBlogPosts2();

// async function fetchBlogPosts(page) {
//     try {
//         const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Shira?page=${page}&limit=${pageSize}`, {
//         // const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Shira`, {

//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         createBlogCards(data.data);
//         // displayImageHeader(data.data);
//         console.log('Logging card data: ', data);
//         updatePaginationUI(data.meta)
//     } catch (error) {
//         console.error('Could not fetch data' + error);
//         throw error ("There was a problem getting the data");
//     }
// }



// function displayImageHeader(blogPosts){

//     if (blogPosts.length > 0) {
//         const latestPost = blogPosts[0];
//         let header = document.querySelector('header');
//         console.log('header posts',latestPost);

//         // let blogImgHeader = document.getElementById('headerImage');
//         //     blogImgHeader.classList.add('header', 'flex-center', 'flex-col', 'items-center');
//         //     blogImgHeader.style.backgroundImage = `
//         //     ${latestPost.media.url}`;
//             // blogImgHeader.style.backgroundSize = 'cover';
//             // blogImgHeader.style.backgroundPosition = 'center';
//             // blogImgHeader.style.width = '100%';
//             // blogImgHeader.style.height = '100%';

            
//             header.appendChild(blogImgHeader);
//     }  
// }


//const pageSize = 30; // Number of blog posts per page
//let currentPage = 1; // Initial page number

// // Pagination part, look into more later..... Called inside fetchBlogPosts
// function updatePaginationUI(paginationMeta) {
//     const prevPageBtn = document.getElementById('prevPageBtn');
//     const nextPageBtn = document.getElementById('nextPageBtn');
//     // const paginationNumbers = document.getElementById('paginationNumbers');

//     if (paginationMeta.isFirstPage || paginationMeta.isLastPage) {
//         prevPageBtn.style.opacity = '0.5';
//         prevPageBtn.disabled = true;
//     } else {
//         prevPageBtn.style.opacity = '1';
//         prevPageBtn.disabled = false;
//     }

//     if (paginationMeta.isLastPage) {
//         nextPageBtn.style.opacity = '0.5';
//         nextPageBtn.disabled = true;
//     } else {
//         nextPageBtn.style.opacity = '1';
//         nextPageBtn.disabled = false;
//     }
// }

// document.getElementById('prevPageBtn').addEventListener('click', () => {
//     if (currentPage > 1) {
//         currentPage--;

//         fetchBlogPosts2(currentPage);
//     }
// });

// document.getElementById('nextPageBtn').addEventListener('click', () => {
//     currentPage++;
//     fetchBlogPosts2(currentPage);
// });
// End pagination part......