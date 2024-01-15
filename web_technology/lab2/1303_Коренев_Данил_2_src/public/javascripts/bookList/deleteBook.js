function deleteBook(id) {
    openConfirmDialog(id)

    const buttonYes = document.getElementsByClassName("confirm-button")[0]
    buttonYes.onclick = () => confirmDelete(id)

    const buttonNo = document.getElementsByClassName("cancel-button")[0]
    buttonNo.onclick = () => closeDialog()
}

function openConfirmDialog(){
    dialog.show()
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
            closeDialog(dialog)
        }
    });
}

function closeDialog(){
    dialog.close()
}

function confirmDelete(id){
    closeDialog()
    fetch('/library/deleteBook', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            window.location.reload()
        })
        .catch(error => {
            console.error(error);
        });
}

const dialog = document.getElementsByClassName("confirm-dialog")[0]

const bookList = document.querySelector('.book-list');
bookList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
        const id = parseInt(deleteButton.getAttribute('name'));
        deleteBook(id);
    }
});



