
export function clearFields() {
    const cancelButton = document.getElementById('clearPostBtn');
    cancelButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        const confirmClear = window.confirm('Do you want to clear all fields in this post?');
        if (confirmClear) {
            document.getElementById('previewImg').src = '';
            document.getElementById('fieldUrl').value = '';
            document.getElementById('fieldAlt').value = '';
            document.getElementById('fieldTitle').value = '';
            document.getElementById('fieldBlogText').value = '';
            alert('All fields have been cleared, add some new Pawsome information');
        }
    });
}