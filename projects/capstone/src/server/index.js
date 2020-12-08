const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { get } = require('axios')
const dotenv = require('dotenv');
const { calculateDuration } = require('./calculate-duration')

const poorMansCache = { to: null, from: null, destination: null, result: null }

const app = express();
const port = 3000;

dotenv.config()
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY
const PIXABAY_KEY = process.env.PIXABAY_KEY

const GEONAMES_HOST = 'http://api.geonames.org'
const WEATHERBIT_HOST = 'https://api.weatherbit.io'
const PIXABAY_HOST = 'https://pixabay.com'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../../dist'));

app.post('/process', async (req, res) => {
    const { from, to, destination } = req.body
    if (isInCache(from, to, destination)) {
        res.send(poorMansCache.result)
    } else {
        const { townName, lng, lat } = await getGeoData(destination)
        const result = {
            duration: calculateDuration(from, to),
            townName,
            averageTemp: await getAverageTemperature(lat, lng),
            imageUrl: await getTownImage(townName)
        }
        addToCache(from, to, destination, result)
        res.send(result)
    }
});

function isInCache(from, to, destination) {
    return poorMansCache.to === to
        && poorMansCache.from === from
        && poorMansCache.destination === destination
}

function addToCache(from, to, destination, result) {
    poorMansCache.to = to
    poorMansCache.from = from
    poorMansCache.destination = destination
    poorMansCache.result = result
}

async function getGeoData(destination) {
    const url = `${GEONAMES_HOST}/geoCodeAddressJSON?q=${destination}&username=${GEONAMES_USERNAME}`
    const geoResponse = await get(url)
    const townName = geoResponse.data.address.adminName2
    const { lng, lat } = geoResponse.data.address
    return { townName, lng, lat }
}

async function getTownImage(townName) {
    const pixabayResponse = await get(`${PIXABAY_HOST}/api/?key=${PIXABAY_KEY}&q=${townName}`)
    return pixabayResponse.data.hits[0].webformatURL
}

async function getAverageTemperature(lat, lng) {
    const weatherResponse = await get(`${WEATHERBIT_HOST}/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_KEY}`)
    const averageTemp = weatherResponse.data.data.map(r => r.temp).reduce((a, b) => (a + b) / 2)
    return Math.round(averageTemp)
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

