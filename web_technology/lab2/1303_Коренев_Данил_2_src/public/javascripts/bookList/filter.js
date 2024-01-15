const sortSelect = document.getElementById("sort-select")
sortSelect.onchange = () => handleSortChange(sortSelect.value)

function handleSortChange(value) {
    const data = { sortBy: value };
    fetch('/library/filter-books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(filteredBooks => {
            const booksList = document.querySelector('.book-list');
            booksList.innerHTML = '';
            filteredBooks.forEach(book => {
                //контейнер для книги
                const bookContainer = document.createElement('div');
                bookContainer.classList.add('book-container'); // Добавьте необходимые классы

                //кнопка удаления
                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('delete-button');
                deleteButton.textContent = 'Удалить';
                deleteButton.setAttribute('name', book.id);

                //иконка удаления
                const trashIcon = document.createElement('i');
                trashIcon.classList.add('fas', 'fa-trash');

                //добавление иконки
                deleteButton.appendChild(trashIcon)

                //контейнер для обложки книги
                const bookWrapperContainer = document.createElement('div');
                bookWrapperContainer.classList.add('bookWrapper-container');
                bookWrapperContainer.id = book.id;

                //изображение обложки книги
                const bookCover = document.createElement('img');
                bookCover.classList.add('book-cover');
                bookCover.src = `/covers/${book.id}.jpg`;
                bookCover.onerror = function() {
                    bookCover.src = '/covers/0.jpg';
                };
                bookCover.alt = 'Book Cover';

                //контейнер для деталей книги
                const bookDetails = document.createElement('div');
                bookDetails.classList.add('book-details');

                //заголовок, автора и год книги
                const title = document.createElement('h2');
                title.classList.add('book-title');
                title.textContent = book.title;

                const author = document.createElement('p');
                author.classList.add('book-author');
                author.textContent = `Автор: ${book.author}`;

                const year = document.createElement('p');
                year.classList.add('book-year');
                year.textContent = `Год: ${book.year}`;

                bookDetails.appendChild(title);
                bookDetails.appendChild(author);
                bookDetails.appendChild(year);

                const reserved = document.createElement('p');
                reserved.classList.add('book-reseved');
                if (book.dateReturn && book.reserverName) {
                    reserved.textContent = `Выдана ${book.reserverName} до ${book.dateReturn}`;
                } else {
                    reserved.textContent = `Доступна к выдаче`;
                }
                bookDetails.appendChild(reserved)

                bookWrapperContainer.appendChild(bookCover);
                bookWrapperContainer.appendChild(bookDetails);
                bookContainer.appendChild(deleteButton);
                bookContainer.appendChild(bookWrapperContainer);

                booksList.appendChild(bookContainer);
            });
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}
