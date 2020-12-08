import { readUserInput } from "../src/client/js/readUserInput";

describe("readUserInput", () => {
    describe("when called", () => {
        test("should read value from element", () => {
            document.body.innerHTML = '<div id="town-name"></div>'
            setDestination('test destination');
            expect(document.getElementById('town-name').innerText).toBe('test destination');
        })
    })
})