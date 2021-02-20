const nowTime = document.querySelector(".time");
const date = document.querySelector(".day");

function addZero(num) {
    return num < 10 ? `0${num}` : num; 
}

function getWeek() {
    const now = new Date();
    const day = now.getDay();
    const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
    return dayArr[day];
}
function getTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    date.innerText = `${year}/${addZero(month)}/${addZero(day)}(${getWeek()})`;
    nowTime.innerText = `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}
function init() {
    setInterval(getTime, 1000);

}

init(); 