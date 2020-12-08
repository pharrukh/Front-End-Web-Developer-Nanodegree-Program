import './styles/style.scss'

const btnSearch = document.getElementById('btn-search')
btnSearch.addEventListener('click', async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(readUserInput())
    })
    const { duration, townName, averageTemp, imageUrl } = await response.json()
    console.log(duration, townName, averageTemp, imageUrl)
    const caption = document.getElementById('caption')
    caption.style.backgroundImage = `url('${imageUrl}')`;
    
    const temperature = document.getElementById('temperature')
    temperature.innerText = `${averageTemp}°`

    const tripDuration = document.getElementById('trip-duration')
    tripDuration.innerText = `${duration} days`

    const destinationName = document.getElementById('town-name')
    destinationName.innerText = townName
})

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