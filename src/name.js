const nameClass = document.querySelector(".name");
const nameInput = document.querySelector(".nameInput");
const nameForm = document.querySelector(".nameForm");
const taskHeaderName = document.querySelector(".taskHeaderName");
const LOCALSTORAGE_NAME = "name";

function getName () {
    const name = localStorage.getItem(LOCALSTORAGE_NAME);
    return name;
}

function printName () {
    nameForm.style.display = 'none';
    const name = getName();
    const h1 = document.createElement("h1");
    h1.innerText = `${name}님 안녕하세요.`;
    taskHeaderName.innerText = `${name}님의 할 일.`;
    nameClass.appendChild(h1);
}

function setName(event) {
    event.preventDefault();
    const inputValue = nameInput.value;
    localStorage.setItem(LOCALSTORAGE_NAME, inputValue);
    printName();
}
function init() {
    nameForm.addEventListener("submit", setName);
    const name = getName();
    if (name !== null) {
        printName();
    }

}

init();