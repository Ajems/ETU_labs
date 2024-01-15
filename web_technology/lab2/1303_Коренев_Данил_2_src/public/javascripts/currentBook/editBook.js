const id = document.getElementsByClassName("book-info")[0].id
const editButton = document.getElementsByClassName("edit-button")[0]
editButton.onclick = () => editBook(id)

const saveButton = document.getElementById("saveButton")
saveButton.onclick = () => updateBook(id)

const cancelEditButton = document.getElementById("cancelEditButton")
cancelEditButton.onclick = () => closeEditDialog()

function closeEditDialog() {
    const dialog = document.getElementsByClassName("dialog-edit")[0]
    dialog.close()
}

async function editBook(id){
    const dialog = document.getElementsByClassName("dialog-edit")[0]
    const titleInput = document.getElementById("bookTitle");
    const authorInput = document.getElementById("bookAuthor");
    const yearInput = document.getElementById("bookYear");

    dialog.show()

    try {
        const bookData = await getBookData(id)
        titleInput.value = bookData.title;
        authorInput.value = bookData.author;
        yearInput.value = bookData.year;
    } catch (e) {
        dialog.close()
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
            dialog.close()
        }
    });
}

function getBookData(id) {
    return new Promise((resolve, reject) => {
        fetch(`/library/getBook/${id}`)
            .then(response => response.json())
            .then(bookData => {
                resolve(bookData);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

function updateBook(id){
    if (checkData()){
        const dialog = document.getElementsByClassName("dialog-edit")[0]
        dialog.close()
        const titleInput = document.getElementById("bookTitle");
        const authorInput = document.getElementById("bookAuthor");
        const yearInput = document.getElementById("bookYear");
        const coverInput = document.getElementById("bookImage").files[0];
        uploadBook(titleInput.value, authorInput.value, yearInput.value, coverInput, id)
    }
}

function uploadBook(title, author, year, cover, id) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('year', year);
    formData.append('cover', cover);
    formData.append('id', id)
    fetch(`/library/updateBook/${id}`, {
        method: 'PUT',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload()
        })
        .catch(error => {
            console.error(error);
        });
}

function checkData(){
    const titleInput = document.getElementById("bookTitle");
    const authorInput = document.getElementById("bookAuthor");
    const yearInput = document.getElementById("bookYear");

    var result = true

    if (titleInput.value.length < 1) {
        titleInput.classList.add("invalid-input");
        result = false
    } else {
        titleInput.classList.remove("invalid-input");
        titleInput.classList.add("valid-input");
    }

    if (authorInput.value.length < 1) {
        authorInput.classList.add("invalid-input");
        result = false;
    } else {
        authorInput.classList.remove("invalid-input");
        authorInput.classList.add("valid-input");
    }

    if (parseInt(yearInput.value) > 2023 || yearInput.value === "") {
        yearInput.classList.add("invalid-input");
        result = false;
    } else {
        yearInput.classList.remove("invalid-input");
        yearInput.classList.add("valid-input");
    }

    return result
}