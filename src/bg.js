const background = document.querySelector("body");

const IMAGE_NUMBER = 3;

function genarateRandomNum() {
    const number = Math.floor(Math.random() * IMAGE_NUMBER);
    return number;
}

function paintImage(randomImage) {
    const image = new Image();
    image.src=`img/${randomImage + 1}.jpg`;
    image.classList.add("bgImage");
    background.appendChild(image);
}

function init() {
    const randomNum = genarateRandomNum();
    paintImage(randomNum);
}

init();