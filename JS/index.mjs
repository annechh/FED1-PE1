// import { fetchApi } from "./fetch.mjs";
import { carousel } from "./carousel.mjs";
import { fontawsomeScript } from "./components/default.mjs";
import { indexHeader } from "./components/indexHeader.mjs";
// import { userDataLocalStorage } from "./login.mjs";
import { loggedInEvents, getUserData } from "./components/loginState.mjs";



const pageSize = 12; // Number of blog posts per page
let currentPage = 1; // Initial page number
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

fetchBlogPosts(currentPage);

async function fetchBlogPosts(page) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Shira?page=${page}&limit=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        createBlogCards(data.data);
        console.log('Logging card data: ', data);
        updatePaginationUI(data.meta)
    } catch (error) {
        console.error('Could not fetch data' + error)
        throw error ("There was a problem getting the data")
    }
}
// function fetchBlogPosts(page) {
//     fetch(`https://v2.api.noroff.dev/blog/posts/Shira?page=${page}&limit=${pageSize}`, {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//     .then((response) => response.json())
//     .then(data => {
//         createBlogCards(data.data);
//         console.log('Logging data: ', data);
//         updatePaginationUI(data.meta)
//     })
//     .catch(error => console.error('Error Fetching posts', error));
// }

function createBlogCards(blogPosts) {
    let blogCardWrapper = document.getElementById('cardWrapper');
    // blogCardWrapper.innerHTML = '';

    blogPosts.forEach(data => {
        let blogCard = document.createElement('div');
            blogCard.classList.add('blog-card', 'gap');
            blogCard.addEventListener('click',() => {
                // window.location.href = `post/index.html?id=${data.id}`;
            })

        let imgContainer = document.createElement('div');
            imgContainer.classList.add('card-img-container');

        let img = document.createElement('img');
            img.alt = data.title;
            if (data.media && data.media.url) {
            img.src = data.media.url;
            } else {
            img.src = '';
            }

        let blogCardInfo = document.createElement('div');
            blogCardInfo.classList.add('blog-card-info');

        let deleteCheckbox = document.createElement('input');
            deleteCheckbox.type = 'checkbox';
            deleteCheckbox.classList.add('delete-checkbox');
            deleteCheckbox.id = 'deleteCheckbox';
            deleteCheckbox.value = data.id;

        let titleDateContainer = document.createElement('div');
            titleDateContainer.classList.add('card-title-date');

        let title = document.createElement('h2');
            title.textContent = data.title;

        let date = document.createElement('p');
            date.textContent = ' ';

        let formattedDate = new Date(data.created)
        let span = document.createElement('span');
            span.textContent = `${formattedDate.getDate()} ${months[formattedDate.getMonth()]} ${formattedDate.getFullYear()}`;

        let btnContainer = document.createElement('div');
            btnContainer.classList.add('pb');

        let btn = document.createElement('button');
            btn.classList.add('hover', 'btn');
            btn.textContent = 'View Post';
            btn.addEventListener('click',() => {
                window.location.href = `post/index.html?id=${data.id}`;
            })

        imgContainer.appendChild(img);
        date.appendChild(span);
        titleDateContainer.append(title, date);
        btnContainer.appendChild(btn);
        blogCardInfo.append(deleteCheckbox, titleDateContainer, btnContainer);
        blogCard.append(imgContainer, blogCardInfo);
        blogCardWrapper.appendChild(blogCard);
    });
}



// Pagination part, look into more later..... Called inside fetchBlogPosts
function updatePaginationUI(paginationMeta) {
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    // const paginationNumbers = document.getElementById('paginationNumbers');

    if (paginationMeta.isFirstPage || paginationMeta.isLastPage) {
        prevPageBtn.style.opacity = '0.5';
        prevPageBtn.disabled = true;
    } else {
        prevPageBtn.style.opacity = '1';
        prevPageBtn.disabled = false;
    }

    if (paginationMeta.isLastPage) {
        nextPageBtn.style.opacity = '0.5';
        nextPageBtn.disabled = true;
    } else {
        nextPageBtn.style.opacity = '1';
        nextPageBtn.disabled = false;
    }
}

document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;

        fetchBlogPosts(currentPage);
    }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
    currentPage++;
    fetchBlogPosts(currentPage);
});
// End pagination part......


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


function selectPostsBtn() {
    selectBtn.addEventListener('click', () => {
        console.log('Select post, changed to Delete post',selectBtn);
        selectBtn.style.display = 'none';
        deleteBtn.style.display = 'flex';
        cancelBtn.style.display = 'flex';
        displayCheckBox()
    })
    deleteSelectedPosts()
    cancelSelectPosts(); 
}
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
            resetUI(); // Reset the UI after deletion
            alert('Selected posts deleted successfully');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error deleting posts:', error);
            alert('Failed to delete selected posts');
        }
    });
}

function displayCheckBox() { 
    const checkboxes = document.querySelectorAll('.delete-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.style.display = 'flex';
        checkbox.addEventListener('change', () => {
            console.log(`Checkbox with value ${checkbox.value} checked: ${checkbox.checked}`);
        });
    });
    console.log('checkboxes: ', checkboxes);
}

function resetUI() {
    const checkboxes = document.querySelectorAll('.delete-checkbox');
        if (checkboxes.length > 0) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.style.display = 'none';
            });
        }
    
    deleteBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    selectBtn.style.display = 'flex'; 
}

