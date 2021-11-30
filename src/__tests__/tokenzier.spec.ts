import { Token } from "../interfaces";
import OpType from "../operations";
import tokenzier, { checkIfLineEnds, createToken, findRuleByToken, getNextCharInLine, tokenzieLine } from "../tokenzier";

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
        expect(tokenzier("")).toStrictEqual([]);
        expect(tokenzier("")).toHaveLength(0);
        expect(tokenzier("fw 40\n lt 20")).toHaveLength(4)
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

        expect(createToken("# abc", 0, 4)).toMatchObject<Token>(token)
        expect(createToken("   # abc   ", 0, 10)).toMatchObject<Token>(token)
    })

    test('create a token', () => {
        expect(createToken("abc", 0, 2)).toMatchObject<Token>({
            type: OpType.OP_UNKNOW,
            value: 'abc',
            position: {
                line: 1,
                column: 1
            }
        })

        expect(createToken("lt", 0, 1)).toMatchObject<Token>({
            type: OpType.OP_LEFT,
            value: null,
            position: {
                line: 1,
                column: 1
            }
        })

        expect(createToken("    # space    ", 0, 14)).toMatchObject<Token>({
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
            { token: "# comment", type: OpType.OP_COMMENT },
            { token: "fd", type: OpType.OP_FORWARD },
            { token: "forward", type: OpType.OP_FORWARD },
            { token: "bk", type: OpType.OP_BACKWARD },
            { token: "backward", type: OpType.OP_BACKWARD },
            { token: "lt", type: OpType.OP_LEFT },
            { token: "left", type: OpType.OP_LEFT },
            { token: "rt", type: OpType.OP_RIGHT },
            { token: "right", type: OpType.OP_RIGHT },
            { token: "123", type: OpType.OP_NUMBER },
            { token: "dhahsdja", type: OpType.OP_UNKNOW },
        ]


        for (const { token, type } of tokens) {
            expect(findRuleByToken(token)).toMatchObject({ type })
        }

    })


    test("rules throw an error", () => {
        expect(() => findRuleByToken("")).toThrow(Error)
        expect(() => findRuleByToken(null)).toThrow(Error)
    })


    test('a line can be tokenized', () => {
        const tokens = tokenzieLine("lt 20 fd 10", 0);

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
})



