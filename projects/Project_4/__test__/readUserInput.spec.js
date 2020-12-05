import { readUserInput } from "../src/client/js/readUserInput";

describe("readUserInput", () => {
    describe("when called", () => {
        test("should read value from element", () => {

            document.body.innerHTML =
                '<div>' +
                '  <input id="url-input" value="test">' +
                '</div>';

            const value = readUserInput();
            expect(value).toBe('test');
        })
    })
})