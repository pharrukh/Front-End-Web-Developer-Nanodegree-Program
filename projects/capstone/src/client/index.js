import './styles/style.scss'

setSearchClickListener()

function setSearchClickListener() {
    const btnSearch = document.getElementById('btn-search')
    btnSearch.addEventListener('click', async (e) => {
        e.preventDefault()
        const { duration, townName, averageTemp, imageUrl } = await getTripData()
        setData(duration, townName, averageTemp, imageUrl)
    })
}

function setData(duration, townName, averageTemp, imageUrl) {
    setImage(imageUrl)
    setTemperature(averageTemp)
    setTripDuration(duration)
    setDestination(townName)
}

async function getTripData() {
    const response = await fetch('http://localhost:3000/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(readUserInput())
    })

    return await response.json()
}

function setDestination(townName) {
    const destinationName = document.getElementById('town-name')
    destinationName.innerText = townName
}

function setTripDuration(duration) {
    const tripDuration = document.getElementById('trip-duration')
    tripDuration.innerText = `${duration} days`
}

function setTemperature(temp) {
    const temperature = document.getElementById('temperature')
    temperature.innerText = `${temp}°`
}

function setImage(url) {
    const caption = document.getElementById('caption')
    caption.style.backgroundImage = `url('${url}')`;
}

function readUserInput() {
    const fromDatePicker = document.getElementById('from-date-picker')
    const toDatePicker = document.getElementById('to-date-picker')
    const destinationTextBox = document.getElementById('destination')
    return {
        from: fromDatePicker.value,
        to: toDatePicker.value,
        destination: destinationTextBox.value
    }
}