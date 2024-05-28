import { carousel } from "../components/carousel.mjs";
import { fontawsomeScript } from "../components/default.mjs";
import { indexHeader } from "../components/indexHeader.mjs";
import { loggedInEvents, getUserData, checkForAdmin } from "../components/loginState.mjs";
import { fetchApi, userUrl } from "../components/fetch.mjs";


const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
];

let currentPage = 1;
const postsPerPage = 12;
let totalPostsLoaded = 0;

let allBlogPosts = [];
let selectedTag = '';

async function loadPage() {

    await fetchBlogPosts()
        welcomeUser();
        deleteSelectedPosts()
        cancelSelectPosts(); 
        selectPostsBtn()
        populateTagsDropdown()
}


async function loadMorePosts() {
    currentPage++;
    await fetchBlogPosts();
}

document.getElementById('loadMoreBtn').addEventListener('click', loadMorePosts);


function createBlogCards(blogPosts) {
    const blogCardWrapper = document.getElementById('cardWrapper');
        blogCardWrapper.innerHTML = '';

    blogPosts.forEach(data => {
        
        let blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
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
            title.classList.add('px');

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

async function fetchBlogPosts() {
    const apiUrl = `${userUrl}?page=${currentPage}&limit=${postsPerPage}`;
    
    try {
        const data = await fetchApi('GET', apiUrl);

        allBlogPosts = allBlogPosts.concat(data.data);

        const filteredPosts = selectedTag ? allBlogPosts.filter(post => post.tags.includes(selectedTag)) : allBlogPosts;

        createBlogCards(filteredPosts);
        totalPostsLoaded += data.data.length;

        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.style.display = data.data.length < postsPerPage ? 'none' : 'block';
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        alert('Voffsies! could not find the Pawsome posts');
    }
}

function filterPostsByTag() {
    const filteredPosts = selectedTag ? allBlogPosts.filter(post => post.tags.includes(selectedTag)) : allBlogPosts;
    createBlogCards(filteredPosts);
}


function populateTagsDropdown() {
    const tagsDropdown = document.getElementById('sortTagsDropdown');
    tagsDropdown.innerHTML = ''; 

    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All Tags';
    tagsDropdown.appendChild(allOption);

    const uniqueTags = [...new Set(allBlogPosts.flatMap(post => post.tags))];
    
    uniqueTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagsDropdown.appendChild(option);
    });

    
    tagsDropdown.value = selectedTag;
}




document.getElementById('sortTagsDropdown').addEventListener('change', function(event) {
    selectedTag = event.target.value === "All Tags" ? '' : event.target.value;
    filterPostsByTag();
});




function welcomeUser() {
    const userData = getUserData()
    if (userData) {
        const userName = userData.name

        const introWrapper = document.querySelector('.intro-wrapper');

        const welcomeDiv = document.createElement('div');

        const welcomeTitle = document.createElement('h2');
            welcomeTitle.classList.add('welcome-user-title');
            welcomeTitle.textContent = `Pawsome to see you, ${userName}!`;

        welcomeDiv.appendChild(welcomeTitle)
        introWrapper.insertBefore(welcomeDiv, introWrapper.firstChild)
    }
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
    });
}


const selectBtn = document.getElementById('selectPostsBtn');
const deleteBtn = document.getElementById('deleteSelectedPostsBtn');
const cancelBtn = document.getElementById('cancelSelectPostsBtn');

function selectPostsBtn() {
    selectBtn.addEventListener('click', () => {
        selectBtn.style.display = 'none';
        deleteBtn.style.display = 'flex';
        cancelBtn.style.display = 'flex';
        
        document.querySelectorAll('.blog-card').forEach(blogCard => {
            blogCard.removeEventListener('click', blogCard._navigateToPost);
        });
        displayCheckBox()
    })
}


function cancelSelectPosts() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            resetUI();
        }
    });
    cancelBtn.addEventListener('click', () => {
        resetUI();
    })
}


function getSelectedPostIds() {
    const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function confirmDeletion() {
    const confirm = window.confirm('Voff! Are you sure you want to delete the selected Pawsome posts?');
    resetUI()
    return confirm;
}

async function deletePostsById(id) {
    await fetchApi('DELETE', `${userUrl}/${id}`);
}

async function deleteSelectedPosts() {
    deleteBtn.addEventListener('click', async () => {
        if (!checkForAdmin()) {
            alert('You do not have permission to delete posts');
            window.location.reload(); 
            return; 
        }
        const ids = getSelectedPostIds();

        if (ids.length === 0) {
            alert('No posts selected for deletion');
            return;
        }
        if (!confirmDeletion()) {
            return;
        }
        try {
            for (const id of ids) {
                await deletePostsById(id);
            }
            alert('Selected posts deleted successfully, reloading page');
            resetUI(); 
            window.location.href = 'index.html';
        } catch (error) {
            alert('Failed to delete selected Pawsome posts');
        }
    });
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
    