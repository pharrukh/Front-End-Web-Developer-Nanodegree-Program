import { handleSubmit, test } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

const btn = document.getElementById('btn-process')
btn.addEventListener('click', () => {
    console.log('button was clicked')
})