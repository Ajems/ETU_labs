function openBookPage(id){
    window.location = `/library/book/${id}`
}

const bookList = document.querySelector('.book-list');
bookList.addEventListener('click', (event) => {
    const bookWrapper = event.target.closest('.bookWrapper-container');
    if (bookWrapper) {
        const id = bookWrapper.id;
        openBookPage(id);
    }
});