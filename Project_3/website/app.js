/* Global Variables */
const KEY = 'ad1972e62cc0bada0e2a8d14b4417fdd';
const WEATHER_API_HOST = 'http://api.openweathermap.org';
const SERVER_HOST = 'http://localhost:3000';

main();

/** =================
 *   Functions
 *  =================
 */

async function main() {
    setButtonClickListener();
}

function setButtonClickListener() {
    const button = document.getElementById('generate');
    button.addEventListener("click", onGenerateButtonClickCallback);
}

async function onGenerateButtonClickCallback() {
    try {
        const zip = readZip();
        const weatherApiResponse = await getWeatherFor(zip);
        const userResponse = readUserResponse();
        const weatherForecast = map(weatherApiResponse, userResponse);
        await save(weatherForecast);
        const serverData = await get();
        renderForecast(serverData);
    } catch (err) {
        console.log(err)
    }
}

function setText(id, text) {
    const elment = document.getElementById(id);
    elment.textContent = text;
}

function renderForecast(weatherForecast) {
    setText('temp', weatherForecast.temperature);
    setText('date', weatherForecast.date);
    setText('content', weatherForecast['user-response']);
}

function map(weatherApiResponse, userReponse) {
    const date = new Date().toUTCString()
    return {
        temperature: weatherApiResponse.main.temp,
        date,
        'user-response': userReponse
    }
}

async function save(weatherForecast) {
    const response = await fetch(`${SERVER_HOST}/weather-forecast`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(weatherForecast)
    });
    return response.json()
}

async function get() {
    const response = await fetch(`${SERVER_HOST}/weather-forecast`,);
    return response.json();
}

// TODO: rewrite using native nodejs utils
function buildUrl(zip) {
    return `${WEATHER_API_HOST}/data/2.5/weather?zip=${zip}&appid=${KEY}&units=imperial`;
}

async function getWeatherFor(zip) {
    const url = buildUrl(zip);
    const response = await fetch(url);
    return response.json();
}

function readZip() {
    const input = document.getElementById('zip');
    return input.value;
}

function readUserResponse() {
    const input = document.getElementById('feelings');
    return input.value;
}