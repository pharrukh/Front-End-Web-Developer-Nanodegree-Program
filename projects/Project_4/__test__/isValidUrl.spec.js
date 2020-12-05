import { isValidUrl } from "../src/client/js/isValidUrl";

describe("isValidUrl", () => {
    describe('when url is valid', () => {
        test("should return true", () => {
            expect(isValidUrl('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'));
        })
    })
    describe('when url is invalid', () => {
        test("should return false", () => {
            expect(isValidUrl('some text') === false);
        })
    })
});