
const carouselButtons = document.querySelectorAll('.carousel-btn');

carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
        const right = button.dataset.carouselBtn === "next" ? 1 : -1
        const items = button
            .closest("[data-carousel]")
            .querySelector("[data-carousel-items]")
            console.log(right);

        const activeItem = items.querySelector('[data-active]')
        let newIndex = [...items.children].indexOf(activeItem) + right
        if (newIndex < 0) newIndex = items.children.length - 1
        if (newIndex >= items.children.length) newIndex = 0
        items.children[newIndex].dataset.active = true
        delete activeItem.dataset.active
    })
})
