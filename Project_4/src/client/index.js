import "regenerator-runtime/runtime"
import "core-js/stable"

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import { isValidUrl } from './js/isValidUrl'

const SERVER_HOST = 'http://localhost:8080';

(async () => {

    const inputUrl = document.getElementById("url-input")
    inputUrl.addEventListener('input', () => {
        const url = readUserInput()
        if (isValidUrl(url)) {
            enableButton()
            markInputValid()
        } else {
            disableButton()
            markInputInvalid()
        }
    })

    setButtonListener()
    tryToRegisterServiceWorker()

})()

function markInputInvalid() {
    const inputForm = document.getElementById('url-input')
    inputForm.setCustomValidity('wrong url');

}

function markInputValid() {
    const inputForm = document.getElementById('url-input')
    inputForm.setCustomValidity('');
}

function disableButton() {
    const btn = document.getElementById('btn-process')
    btn.disabled = true
}

function enableButton() {
    const btn = document.getElementById('btn-process')
    btn.disabled = false
}

function setButtonListener() {
    const btn = document.getElementById('btn-process')
    btn.addEventListener('click', async (event) => {
        event.preventDefault()
        const url = readUserInput()
        const result = await analyzePage(url)
        presentAnalysis(result)
    })
}

async function analyzePage(url) {
    const response = await fetch(`${SERVER_HOST}/test`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    const { agreement, confidence, irony, subjectivity } = await response.json()
    return { agreement, confidence, irony, subjectivity }
}

function presentAnalysis(result) {
    const { agreement, confidence, irony, subjectivity } = result
    const resultsEl = document.getElementById('results')
    resultsEl.innerText = `agreement: ${agreement}\nconfidence: ${confidence}\nirony: ${irony}\nsubjectivity: ${subjectivity}`
}

function readUserInput() {
    return document.getElementById('url-input').value
}

function tryToRegisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                }).catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}