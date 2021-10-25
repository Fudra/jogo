import rules from './rules';
import { Rule, Token, Value } from './interfaces'


export default (program: string): Array<Token> => {
    const lines = program.split('\n');

    const tokens: Array<Token> = [];

    for (const [index, line] of lines.entries()) {
        const items = tokenzieLine(line, index)
        tokens.push(...items);
    }

    return tokens;
}


export const tokenzieLine = (line: string, row: number): Array<Token> => {
    const tokens: Array<Token> = [];

    let word = '';
    let beginComment = false;

    for (let index = 0; index < line.length; index++) {
        const char = line[index];
        const nextChar = getNextCharInLine(line, index);

        // handle comments
        if (char === '#') {
            beginComment = true;
        }

        // if komment, skip line to the end
        if (beginComment) {
            word += char;

            if (index == line.length - 1) {
                tokens.push(createToken(word, row, index));
            }

            continue;
        }

        if (char !== ' ') {
            word += char;
        } else if (char === ' ') {
            word = '';
        }

        if (checkIfLineEnds(char, nextChar)) {
            tokens.push(createToken(word, row, index));
        }
    }

    return tokens;
}

export const findRuleByToken = (value: Value): Rule => {
    if (value?.toString().length === 0 || value === null) {
        throw new Error(`Value is an emtpy string or null`)
    }

    const rule = rules.find((rule) => rule.check(value));

    if (rule == undefined) {
        throw new Error(`Unable to find a rule for the Value "${value}"`)
    }

    return rule;
}

export const createToken = (word: string, row: number, col: number): Token => {
    const rule = findRuleByToken(word.trim());
    const item: Token = {
        type: rule.type,
        value: rule.cast(word.trim()),
        position: {
            // Start count at 1 instead of 0
            line: row + 1,
            column: col - word.length + 2,
        },
    };

    return item;
}

export const checkIfLineEnds = (char: string, nextChar: string | null): boolean => {
    return char !== ' ' && (nextChar === ' ' || nextChar === null);
}

export const getNextCharInLine = (line: string, index: number): string | null => {
    return index + 1 < line.length ? line[index + 1] : null;
}