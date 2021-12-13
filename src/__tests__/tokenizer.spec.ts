import { Token } from "../interfaces";
import OpType from "../operations";
import rules from '../rules';

import tokenzier, { checkIfLineEnds, createToken, findRuleByToken, findRuleByValue, getNextCharInLine, tokenizeLine } from "../tokenizer";

describe('tokenizer', () => {
    test('check if line ends', () => {
        expect(checkIfLineEnds('a', ' ')).toBeTruthy();
        expect(checkIfLineEnds('a', null)).toBeTruthy();
        expect(checkIfLineEnds(' ', ' ')).toBeFalsy();
        expect(checkIfLineEnds(' ', null)).toBeFalsy();
    })

    test('check if a line ends', () => {
        expect(getNextCharInLine('abc', 0)).toBe('b');
        expect(getNextCharInLine('abc', 1)).toBe('c');
        expect(getNextCharInLine('abc', 2)).toBeNull();
    })

    test('tokenizer', () => {
        expect(tokenzier("", rules)).toStrictEqual([]);
        expect(tokenzier("", rules)).toHaveLength(0);
        expect(tokenzier("fw 40\n lt 20", rules)).toHaveLength(4)
    })

    test('token position', () => {
        const token: Token = {
            type: OpType.OP_COMMENT,
            value: '# abc',
            position: {
                line: 1,
                column: 1
            }
        }

        expect(createToken("# abc", 0, 4, rules)).toMatchObject<Token>(token)
        expect(createToken("   # abc   ", 0, 10, rules)).toMatchObject<Token>(token)
    })

    test('create a token', () => {
        expect(createToken("abc", 0, 2, rules)).toMatchObject<Token>({
            type: OpType.OP_UNKNOW,
            value: 'abc',
            position: {
                line: 1,
                column: 1
            }
        })

        expect(createToken("lt", 0, 1, rules)).toMatchObject<Token>({
            type: OpType.OP_LEFT,
            value: null,
            position: {
                line: 1,
                column: 1
            }
        })

        expect(createToken("    # space    ", 0, 14, rules)).toMatchObject<Token>({
            type: OpType.OP_COMMENT,
            value: "# space",
            position: {
                line: 1,
                column: 1
            }
        })
    })

    test("find token by rule", () => {
        const tokens = [
            { token: "# comment", type: OpType.OP_COMMENT, value: "# comment" },
            { token: "fd", type: OpType.OP_FORWARD, value: null },
            { token: "forward", type: OpType.OP_FORWARD, value: null },
            { token: "bk", type: OpType.OP_BACKWARD, value: null },
            { token: "backward", type: OpType.OP_BACKWARD, value: null },
            { token: "lt", type: OpType.OP_LEFT, value: null },
            { token: "left", type: OpType.OP_LEFT, value: null },
            { token: "rt", type: OpType.OP_RIGHT, value: null },
            { token: "right", type: OpType.OP_RIGHT, value: null },
            { token: "123", type: OpType.OP_NUMBER, value: 123 },
            { token: "dhahsdja", type: OpType.OP_UNKNOW, value: "dhahsdja" },
        ]


        for (const { token, type, value } of tokens) {
            const tkn = findRuleByValue(token, rules);
            expect(tkn).toMatchObject({ type })
            expect(tkn.cast(value)).toBe(value)
        }

    })


    test("rules throw an error", () => {
        expect(() => findRuleByValue("", rules)).toThrow(Error)
        expect(() => findRuleByValue(null, rules)).toThrow(Error)

        expect(() => findRuleByValue("unknow", [])).toThrow(Error)
    })


    test('a line can be tokenized', () => {
        const tokens = tokenizeLine("lt 20 fd 10", 0, rules);

        const expectArray =
            [
                {
                    type: OpType.OP_LEFT,
                    value: null,
                    position: { line: 1, column: 1 }
                },
                {
                    type: OpType.OP_NUMBER,
                    value: 20,
                    position: { line: 1, column: 4 }
                },
                {
                    type: OpType.OP_FORWARD,
                    value: null,
                    position: { line: 1, column: 7 }
                },
                {
                    type: OpType.OP_NUMBER,
                    value: 10,
                    position: { line: 1, column: 10 }
                }
            ];

        expect(tokens).toStrictEqual(expectArray)

    })

    test('a comment is recognized', () => {
        const tokens = tokenizeLine("# some comment", 0, rules);

        const expectArray =
            [
                {
                    type: OpType.OP_COMMENT,
                    value: "# some comment",
                    position: { line: 1, column: 1 }
                },
            ];

        expect(tokens).toStrictEqual(expectArray)

    })

    it('finds a rule by token', () => {

        const token =
        {
            type: OpType.OP_COMMENT,
            value: "# some comment",
            position: { line: 1, column: 1 }
        }

        const rule = findRuleByToken(token, rules);
        expect(rule).toBe(rules[0])
    })

})



