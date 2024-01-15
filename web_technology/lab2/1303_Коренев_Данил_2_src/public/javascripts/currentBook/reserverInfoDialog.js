const id = document.getElementsByClassName("book-info")[0].id
const dialog = document.getElementsByClassName("dialog-reserver")[0]
const reserverNameText = document.getElementsByClassName("reserverName")[0]
reserverNameText.onclick = () => openReserverInfoDialog()

async function openReserverInfoDialog() {
    const dateReserve = document.getElementById("reserveDate");
    const dateReturn = document.getElementById("returnDate");
    const reserverName = document.getElementById("userName");
    dialog.show();

    try {
        const bookData = await getBookData(id)
        dateReserve.value = bookData.dateReserve
        dateReturn.value = bookData.dateReturn
        reserverName.value = bookData.reserverName
    } catch (e) {
        dialog.close()
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
            dialog.close();
        }
    });

    const closeButton = document.getElementsByClassName('close-button')[0];
    closeButton.onclick = () => dialog.close();
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

