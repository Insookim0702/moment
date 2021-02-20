const LOCALSTORAGE_CORDS = "cords";
const WEATHER_API_KEY = "26b720be24dde2291899755133701f41";
const weather = document.querySelector(".weather");

function saveCoords(coordsObj) {
    localStorage.setItem(LOCALSTORAGE_CORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`).then(
        function(response) {
            return response.json();
        }).then(function(json) {
            const tmp = json.main.temp;
            const position = json.name;
            // console.log(json);
            // console.log(tmp);
            // console.log(position);
            weather.innerHTML = `${tmp} ℃/ ${position}`;
        });
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


function handleGeoError() {
    console.log("cant access geo postion");
}

function askForCords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCords() {
    const loadedCords = localStorage.getItem(LOCALSTORAGE_CORDS);
    if (loadedCords === null) {
        //request location
        askForCords();
    } else {
        //get weather
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
        console.log();
    }
}

function init() {
    
    loadCords();
}

init();
