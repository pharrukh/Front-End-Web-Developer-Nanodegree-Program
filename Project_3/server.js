const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
let weatherData = null;


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/weather-forecast', (req, res) => {
    res.send(weatherData);
});

app.post('/weather-forecast', (req, res) => {
    const weatherForecast = {
        temperature: req.body.temperature,
        date: req.body.date,
        'user-response': req.body['user-response']
    };
    weatherData = weatherForecast;
    res.send({ statusCode: 204 })
});

// Setup Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});