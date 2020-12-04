const path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')
const bent = require('bent')

dotenv.config()
const API_KEY = process.env.API_KEY

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/test', async function (req, res) {
    // const host = 'https://api.meaningcloud.com/sentiment-2.1'
    // const url = `${host}?key=${API_KEY}&lang=en&verbose=y&url=${req.body.url}`
    // const post = bent(url, 'POST', 'json', 200);
    // const response = await post();
    // const {
    //     score_tag,
    //     agreement,
    //     subjectivity,
    //     confidence,
    //     irony,
    // } = response

    const resp = {
        agreement: "DISAGREEMENT",
        confidence: "86",
        irony: "NONIRONIC",
        score_tag: "NEU",
        subjectivity: "SUBJECTIVE"
    }

    // res.send(JSON.stringify({
    //     score_tag,
    //     agreement,
    //     subjectivity,
    //     confidence,
    //     irony,
    // }))

    res.send(resp)
})
