
import { fetchApi, userUrl } from "./fetch.mjs";

export async function carousel() {
    try {
        const carouselItems = document.getElementById('carouselItems');
        const carouselNav = document.getElementById('carouselNav');
        const MAX_SLIDES = 3;

        const data = await fetchApi('GET', userUrl);
        console.log('carousel data', data);

        const carouselBlogPost = data.data.slice(0, MAX_SLIDES);
        console.log(carouselBlogPost);

        carouselBlogPost.forEach((data, index) => {
            let li = document.createElement('li');
            li.classList.add('slide', 'carousel-img');
            if (index === 0) {
                li.setAttribute('data-active', '');
            }

            let img = document.createElement('img');
            img.src = data.media.url;
            img.alt = data.media.alt;

            let titleContainer = document.createElement('div');
            titleContainer.classList.add('carousel-info');

            let titleButton = document.createElement('div');
            titleButton.classList.add('carousel-title-button', 'px', 'gap');

            let title = document.createElement('h1');
            title.textContent = data.title;
            title.classList.add('carousel-h1-title', 'ds-txt');

            let carouselViewButton = document.createElement('button');
            carouselViewButton.classList.add('btn-img');
            carouselViewButton.textContent = 'View Post';
            carouselViewButton.addEventListener('click', () => {
                window.location.href = `post/index.html?id=${data.id}`;
            });

            titleButton.append(title, carouselViewButton);
            titleContainer.appendChild(titleButton);
            li.append(img, titleContainer);
            carouselItems.appendChild(li);

            
            let indicator = document.createElement('span');
            indicator.classList.add('carousel-indicator');
            if (index === 0) {
                indicator.setAttribute('data-active', '');
            }
            
            carouselNav.appendChild(indicator);
        });
    } catch (error) {
        console.error('Could not fetch data' + error);
        throw error("There was a problem getting the data");
    }
}

carousel();



// Code borrowed and modified from: https://www.youtube.com/watch?v=9HcxHDS2w1s&t=477s
const carouselButtons = carouselWrapper.querySelectorAll('.carousel-slide-btn');

carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
        const next = button.dataset.carouselBtn === "next" ? 1 : -1;

        const carouselItems = document.getElementById('carouselItems');
        const carouselNav = document.getElementById('carouselNav');

        const activeItem = carouselItems.querySelector('[data-active]');
        const activeIndicator = carouselNav.querySelector('[data-active]');

        let newIndex = [...carouselItems.children].indexOf(activeItem) + next;

        if (newIndex < 0) newIndex = carouselItems.children.length - 1;
        if (newIndex >= carouselItems.children.length) newIndex = 0;

        activeItem.removeAttribute('data-active');
        carouselItems.children[newIndex].setAttribute('data-active', '');

        activeIndicator.removeAttribute('data-active');
        carouselNav.children[newIndex].setAttribute('data-active', '');
    });
});
