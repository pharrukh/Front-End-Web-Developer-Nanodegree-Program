const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { get } = require('axios')
const dotenv = require('dotenv');

const app = express();
const port = 3000;
let projectData = null;

dotenv.config()
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY
const PIXABAY_KEY = process.env.PIXABAY_KEY

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/weather-forecast', (req, res) => {
    res.send(projectData);
});

app.post('/weather-forecast', (req, res) => {
    const weatherForecast = {
        temperature: req.body.temperature,
        date: req.body.date,
        'user-response': req.body['user-response']
    };
    projectData = weatherForecast;
    res.send({ statusCode: 204 })
});

// Setup Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

(async () => {
    const userInput = 'Samarkand'
    const GEONAMES_HOST = 'http://api.geonames.org'
    const url = `${GEONAMES_HOST}/geoCodeAddressJSON?q=${userInput}&username=${GEONAMES_USERNAME}`
    console.log(url)
    const geoResponse = await get(url)
    const { lng, lat } = geoResponse.data.address
    console.log(lng, lat)
    const WEATHERBIT_HOST = 'https://api.weatherbit.io'
    const weatherResponse = await get(`${WEATHERBIT_HOST}/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_KEY}`)
    const PIXABAY_HOST = 'https://pixabay.com'
    const pixabayResponse = await get(`${PIXABAY_HOST}/api/?key=${PIXABAY_KEY}&q=${userInput}`)
    console.log(JSON.stringify(pixabayResponse.data.hits))
})()
