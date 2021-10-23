import tokenzier, { checkIfLineEnds, createToken, findRuleByToken, getNextCharInLine, tokenzieLine } from "../tokenzier";

test.only('check if line ends', () => {
    expect(checkIfLineEnds('a', ' ')).toBeTruthy();
    expect(checkIfLineEnds('a', null)).toBeTruthy();
    expect(checkIfLineEnds(' ', ' ')).toBeFalsy();
    expect(checkIfLineEnds(' ', null)).toBeFalsy();
})

test.skip('smth', () => {
    tokenzieLine(" ", 1);
    tokenzier("");
    createToken("", 1, 2);
    findRuleByToken("");
    getNextCharInLine("", 0);
})