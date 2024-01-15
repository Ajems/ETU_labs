function openAddBookDialog (){
    const dialog = document.getElementsByClassName("dialog-add")[0]
    const titleInput = document.getElementById("bookTitle");
    const authorInput = document.getElementById("bookAuthor");
    const yearInput = document.getElementById("bookYear");
    const coverInput = document.getElementById("bookImage")

    dialog.show()

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    coverInput.value = ""

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
            dialog.close()
        }
    });
}

function saveBook() {
    if (checkData()){
        const dialog = document.getElementsByClassName("dialog-add")[0]
        dialog.close()

        const titleInput = document.getElementById("bookTitle");
        const authorInput = document.getElementById("bookAuthor");
        const yearInput = document.getElementById("bookYear");
        const coverInput = document.getElementById("bookImage").files[0];
        uploadBook(titleInput.value, authorInput.value, yearInput.value, coverInput)
    }
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

function uploadBook(title, author, year, cover) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('year', year);
    formData.append('cover', cover);

    fetch('/library/addBook', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
        });
}

const addBookButton = document.getElementsByClassName("button-add")[0]
addBookButton.onclick = () => openAddBookDialog()

const saveButton = document.getElementById("saveButton")
saveButton.onclick = () => saveBook()