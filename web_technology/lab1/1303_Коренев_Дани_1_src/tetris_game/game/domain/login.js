function saveName() {
    let name = document.getElementById('username').value;
    console.log(`${name}`)
    localStorage.setItem('name', name);
}

function getName() {
    return localStorage.getItem('name');
}

const nameInput = document.getElementById('username');
nameInput.value = getName();

const submit = document.getElementById('submit')
submit.addEventListener('click', saveName)