export function setDestination(townName) {
    const destinationName = document.getElementById('town-name')
    destinationName.innerText = townName
}

export function setTripDuration(duration) {
    const tripDuration = document.getElementById('trip-duration')
    tripDuration.innerText = `${duration} days`
}

export function setTemperature(temp) {
    const temperature = document.getElementById('temperature')
    temperature.innerText = `${temp}°`
}

export function setImage(url) {
    const caption = document.getElementById('caption')
    caption.style.backgroundImage = `url('${url}')`;
}

export function readUserInput() {
    const fromDatePicker = document.getElementById('from-date-picker')
    const toDatePicker = document.getElementById('to-date-picker')
    const destinationTextBox = document.getElementById('destination')
    return {
        from: fromDatePicker.value,
        to: toDatePicker.value,
        destination: destinationTextBox.value
    }
}