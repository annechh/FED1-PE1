// import { fetchApi } from "./fetch.mjs";
import { carouselButtons } from "./carousel.mjs";

const pageSize = 12; // Number of blog posts per page
let currentPage = 1; // Initial page number

fetchBlogPosts(currentPage);

function fetchBlogPosts(page) {
    fetch(`https://v2.api.noroff.dev/blog/posts/Shira?page=${page}&limit=${pageSize}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then(data => {
        createBlogCards(data.data); // Pass blog post data to create blog cards
        console.log('Logging data: ', data);
        updatePaginationUI(data.meta)
        // Assuming the API provides pagination metadata (total number of pages, etc.)
        // You can use this metadata for more advanced pagination features
    })
    .catch(error => console.error('Error Fetching posts', error));
}

function createBlogCards(blogPosts) {
    let blogCardWrapper = document.getElementById('cardWrapper');
    // blogCardWrapper.innerHTML = ''; 

    blogPosts.forEach(data => {
        let blogCard = document.createElement('div');
        blogCard.classList.add('blog-card', 'gap');

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('card-img-container');

        let img = document.createElement('img');
        img.alt = ''; 
        if (data.media && data.media.url) {
            img.src = data.media.url;
        } else {
            img.src = '../assets/images/Shira.png'; 
        }

        let blogCardInfo = document.createElement('div');
        blogCardInfo.classList.add('blog-card-info');

        let titleDateContainer = document.createElement('div');
        titleDateContainer.classList.add('card-title-date');

        let title = document.createElement('h2');
        title.textContent = data.title;

        let date = document.createElement('p');
        date.textContent = 'Posted: ';

        let span = document.createElement('span');
        span.textContent = data.created;

        let btnContainer = document.createElement('div');
        btnContainer.classList.add('pb');

        let btn = document.createElement('button');
        btn.classList.add('hover', 'btn');
        btn.textContent = 'View Post';
        btn.addEventListener('click',() => {
            window.location.href = `post/index.html?id=${data.id}`
        })

        imgContainer.appendChild(img);
        date.appendChild(span);
        titleDateContainer.append(title, date);
        btnContainer.appendChild(btn);
        blogCardInfo.append(titleDateContainer, btnContainer);
        blogCard.append(imgContainer, blogCardInfo);
        blogCardWrapper.appendChild(blogCard);
    });
}


// Pagination part, look into more later..... Called inside fetchBlogPosts
function updatePaginationUI(paginationMeta) {
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const paginationNumbers = document.getElementById('paginationNumbers');

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

