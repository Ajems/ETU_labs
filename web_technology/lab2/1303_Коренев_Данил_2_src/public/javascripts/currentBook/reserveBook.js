const id = document.getElementsByClassName("book-info")[0].id
const reserveButton = document.getElementsByClassName("reserve-button")[0]
reserveButton.onclick = () => reserveBook(id)

const dialog = document.getElementsByClassName("dialog-reserve")[0]


function reserveBook(id) {
    dialog.show()

    const confirmButton = document.getElementsByClassName("confirm-reserve-button")[0]
    confirmButton.onclick = () => confirmIssue()

    const cancelButton = document.getElementsByClassName("cancel-reserve-button")[0]
    cancelButton.onclick = () => cancelIssue()

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
            dialog.close()
        }
    });
}

function cancelIssue() {
    dialog.close()
}

function confirmIssue() {
    console.log("Confirm reserve")
    const datePicker = document.getElementById("datePicker");
    const selectedDate = datePicker.value;
    const currentDate = getCurrentDate();
    const reserverNameInput = document.getElementById("reserverName");
    const reserverName = reserverNameInput.value;

    if (selectedDate) {
        if (dateCorrect(selectedDate, currentDate) && reserverNameCorrect(reserverName)){
            dialog.close();

            fetch('/library/reserveBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, dateReserve: currentDate, dateReturn: selectedDate, reserverName: reserverName})
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            //TODO make red
        }

    }
}

function dateCorrect(selectedDate, currentDate) {
    const selectedDateTime = new Date(selectedDate);
    const currentDateTime = new Date(currentDate);
    if (selectedDateTime < currentDateTime) {
        return false;
    } else {
        return true;
    }
}

function reserverNameCorrect(name){
    return name.length > 0
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
}
