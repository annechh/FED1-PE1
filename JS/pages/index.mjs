import { carousel } from "../components/carousel.mjs";
import { fontawsomeScript } from "../components/default.mjs";
import { indexHeader } from "../components/indexHeader.mjs";
import { loggedInEvents, getUserData } from "../components/loginState.mjs";
import { fetchApi, userUrl } from "../components/fetch.mjs";


const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"];


async function loadPage() {

    fetchBlogPosts()
    welcomeUser();
    deleteSelectedPosts()
    cancelSelectPosts(); 
    selectPostsBtn()
}


function createBlogCards(blogPosts) {
    const blogCardWrapper = document.getElementById('cardWrapper');

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
    const data = await fetchApi('GET', userUrl);
    console.log('Data index page: ', data);
    createBlogCards(data.data)
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


const selectBtn = document.getElementById('selectPostsBtn');
const deleteBtn = document.getElementById('deleteSelectedPostsBtn');
const cancelBtn = document.getElementById('cancelSelectPostsBtn');

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


function getSelectedPostIds() {
    const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function confirmDeletion() {
    const confirm = window.confirm('Do you want to delete selected posts?');
    resetUI()
    return confirm;
}

async function deletePostsById(id) {
    await fetchApi('DELETE', `${userUrl}/${id}`);
}

async function deleteSelectedPosts() {
    deleteBtn.addEventListener('click', async () => {
        const ids = getSelectedPostIds();
        console.log('ids selected', ids);

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
            alert('Selected posts deleted successfully');
            resetUI(); 
            window.location.href = '../index.html';
        } catch (error) {
            alert('Failed to delete selected posts');
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

