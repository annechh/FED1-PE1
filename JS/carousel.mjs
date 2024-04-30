import { fetchApi } from "./fetch.mjs";


export const carouselButtons = document.querySelectorAll('.carousel-btn');

carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
        const next = button.dataset.carouselBtn === "next" ? 1 : -1
        const items = button
        .closest("[data-carousel]")
        .querySelector("[data-carousel-items]")
        // console.log(next,items);

        const activeItem = items.querySelector('[data-active]')
        let newIndex = [...items.children].indexOf(activeItem) + next
        if (newIndex < 0) newIndex = items.children.length - 1
        if (newIndex >= items.children.length) newIndex = 0
        console.log(activeItem);
        items.children[newIndex].dataset.active = true
        delete activeItem.dataset.active

        fetchApi();
    })
})


// Fetch images
// I want image to change to next image when clicking right arrow
// I want image to change to previous image when clicking left arrow
// I want it to be an endless loop in each direction