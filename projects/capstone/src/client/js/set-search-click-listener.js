import { setImage, setTemperature, setTripDuration, setDestination } from 'utils'

export function setSearchClickListener() {
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
