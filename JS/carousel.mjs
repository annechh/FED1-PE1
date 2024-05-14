import { fetchApi } from "./fetch.mjs";
import { userUrl } from "./fetch.mjs";


export async function carousel() {
    try {
        const carouselItems = document.getElementById('carouselItems');
        const carouselNav = document.getElementById('carouselNav');
        const MAX_SLIDES = 3;

        const data = await fetchApi('GET', userUrl);
        console.log('carousel data',data);

        const carouselBlogPost = data.data.slice(0, MAX_SLIDES);
        console.log(carouselBlogPost);

        carouselBlogPost.forEach((data, index) => {
            let li = document.createElement('li');
                li.classList.add('slide', 'carousel-img');
                if (index === 0) 
                    li.setAttribute('data-active', '')
                    li.classList.add('active-slide');

            let img = document.createElement('img');
                img.src = data.media.url;
                img.alt = data.title;

            let titleContainer = document.createElement('div');
                titleContainer.classList.add('carousel-info');

            let titleButton = document.createElement('div');
                titleButton.classList.add('carousel-title-button')

            let title = document.createElement('h1');
                title.textContent = data.title;
                title.classList.add('carousel-h2-title', 'ds-txt');

            let carouselViewButton = document.createElement('button');
                carouselViewButton.classList.add('btn-img');
                carouselViewButton.textContent = 'View Post';
                carouselViewButton.addEventListener('click', () => {
                    window.location.href = `post/index.html?id=${data.id}`;
                })
            
                titleButton.append(title, carouselViewButton)
                titleContainer.appendChild(titleButton)
                li.append(img, titleContainer);
                carouselItems.appendChild(li)


            let indicator = document.createElement('span');
                indicator.classList.add('carousel-indicator');
                if (index === 0) indicator.classList.add('current-indicator');
            
                carouselNav.appendChild(indicator);
        }); 
    } catch (error) {
        console.error('Could not fetch data' + error)
        throw error ("There was a problem getting the data")
    }
}

carousel()



export const carouselButtons = document.querySelectorAll('.carousel-btn');

carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
        const next = button.dataset.carouselBtn === "next" ? 1 : -1;

        const carouselContainer = button.closest("[data-carousel]");

        const carouselItems = carouselContainer.querySelector("[data-carousel-items]");

        const activeItem = carouselItems.querySelector('[data-active]');

        let newIndex = [...carouselItems.children].indexOf(activeItem) + next;

        if (newIndex < 0) newIndex = carouselItems.children.length - 1;
        if (newIndex >= carouselItems.children.length) newIndex = 0;

        activeItem.removeAttribute('data-active');
        carouselItems.children[newIndex].setAttribute('data-active', '');
    });
});

