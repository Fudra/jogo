import * as helper from '../helper';

describe('helper', () => {
    test('cast number to string', () => {
        expect(helper.castValueToString(12)).toBe("12");
    })

    test('cast string to string', () => {
        expect(helper.castValueToString("test")).toBe("test");
    })

    test('cast null to empty string', () => {
        expect(helper.castValueToString(null)).toBe("");
    })

})