import { calculateDuration } from '../src/server/calculate-duration'

describe('calculateDuration', () => {
    describe('when from is 2020-01-01', () => {
        describe('and to is 2020-01-03', () => {
            test('should return 3', () => {
                expect(calculateDuration('2020-01-01', '2020-01-03')).toBe(3)
            })
        })
    })
})