import { setDestination } from '../src/client/js/utils'

describe('utils', () => {
    describe('setDestination', () => {
        describe('when called', () => {
            test('should update text', () => {
                document.body.innerHTML = '<div id="town-name"></div>'
                setDestination('test destination');
                expect(document.getElementById('town-name').innerText).toBe('test destination')
            })
        })
    })
})