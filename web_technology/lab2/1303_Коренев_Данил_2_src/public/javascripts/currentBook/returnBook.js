const id = document.getElementsByClassName("book-info")[0].id
const returnButton = document.getElementsByClassName("return-button")[0]
returnButton.onclick = () => returnBook()

const dialog = document.getElementsByClassName("dialog-return")[0]

function returnBook() {
    openReturnDialog()

    const buttonYes = document.getElementsByClassName("confirm-return-button")[0]
    buttonYes.onclick = () => confirmDelete()

    const buttonNo = document.getElementsByClassName("cancel-return-button")[0]
    buttonNo.onclick = () => dialog.close()
}

function openReturnDialog(){
    dialog.show()
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
            dialog.close()
        }
    });
}

function confirmDelete(){
    dialog.close()
    fetch('/library/returnBook', {
        method: 'PUT',
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