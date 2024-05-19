import { fontawsomeScript } from "./components/default.mjs";
import { createHeader } from "./components/header.mjs"; 
import { loggedInEvents } from "./components/loginState.mjs";



const idParameter = window.location.search;
const searchParameter = new URLSearchParams(idParameter);
const postId = searchParameter.get('id');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

if (postId) {
    fetchBlogPost(postId)
}
// console.log(searchParameter.get('id'));


function fetchBlogPost(postId) {
    fetch(`https://v2.api.noroff.dev/blog/posts/Shira/${postId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then(data => {
        console.log('DATA RECIVED: ',data); 

        let image = document.getElementById('specificBlogImg');
            image.src = data.data.media.url;
            image.alt = data.data.title;

        let title = document.getElementById('specificBlogTitle');
            title.textContent = data.data.title;

        // let text = document.getElementById('specificBlogText1');
        //     text.textContent = data.data.body;
        
        

        let text = document.getElementById('specificBlogText');
        
        let formattedText = data.data.body
        .split('\n')
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph !== '')
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
            text.innerHTML = formattedText;

        

        let formattedDate = new Date(data.data.created)
        let date = document.getElementById('specificBlogDate');
            date.textContent = `${formattedDate.getDate()} ${months[formattedDate.getMonth()]} ${formattedDate.getFullYear()}`;

        let author = document.getElementById('specificBlogAuthor');
            author.textContent = data.data.author.name;
        
    })
    .catch(error => console.error('Error when trying to fetch post', error))
}



// document.addEventListener('DOMContentLoaded', () => {
//     const newBlogText = document.getElementById('specificBlogText');
//     postData.content.forEach(paragraph => {
//         const newParagraph = document.createElement('p');
//         newParagraph.innerText = paragraph;
//         newBlogText.appendChild(newParagraph);

// })

// })
//  //-------------

// const blogText = document.getElementById('blogText');
// blogText.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         const newParagraph = document.createElement('p');
//         newParagraph.innerText = blogText.value;
//     }
// })
// //-----------
// document.addEventListener("DOMContentLoaded", function() {
//     // Retrieve the stored post data from localStorage
//     const postData = JSON.parse(localStorage.getItem("newPost"));

//     // Insert the post title into the <h1> element
//     document.getElementById("spesificBlogTitle").innerText = postData.title;

//     // Insert the post author into the <span> element with id "spesificBlogAuthor"
//     document.getElementById("spesificBlogAthor").innerText = postData.author;

//     // Insert each paragraph of the post text into the <div> element with id "spesificBlogText"
//     const spesificBlogText = document.getElementById("spesificBlogText");
//     postData.content.forEach(paragraph => {
//         const p = document.createElement("p");
//         p.innerText = paragraph;
//         spesificBlogText.appendChild(p);
//     });

//     // Event listener to create a new <p> tag when pressing enter in the create post form
//     const blogTextField = document.getElementById("blogTextField");
//     blogTextField.addEventListener("keydown", function(event) {
//         if (event.key === "Enter") {
//             event.preventDefault(); // Prevent the default behavior of adding a newline in the textarea
//             const p = document.createElement("p");
//             p.innerText = blogTextField.value;
//             spesificBlogText.appendChild(p);
//             blogTextField.value = ""; // Clear the textarea after adding the paragraph
//         }
//     });
// });