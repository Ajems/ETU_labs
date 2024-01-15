const backButton = document.getElementById("backButton")
backButton.onclick = () => goToLibrary()

function goToLibrary() {
    console.log("GO TO")
    window.location = "/library"
}